package main

import (
	"embed"
	"encoding/json"
	"fmt"
	"os"

	"github.com/adrg/xdg"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	configPath, err := xdg.ConfigFile("njournal/config.json")
	if err != nil {
		fmt.Println("Error getting config path:", err)
		return
	}

	appConfig, err := loadConfig(configPath)

	// Create an instance of the app structure
	app := NewApp(appConfig)

	// Create application with options
	err = wails.Run(&options.App{
		Title:  "njournal",
		Width:  appConfig.Width,
		Height: appConfig.Height,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		OnStartup: app.startup,
		Bind: []interface{}{
			app,
		},
		Debug: options.Debug{
			OpenInspectorOnStartup: true,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}

type AppConfig struct {
	Width        int    `json:"width"`
	Height       int    `json:"height"`
	DataBasePath string `json:"databasePath"`
}

func saveConfig(configPath string, appConfig AppConfig) error {
	bytes, err := json.Marshal(appConfig)
	if err != nil {
		return fmt.Errorf("Error marshalling config: %s", err)
	}

	err = os.WriteFile(configPath, bytes, 0644)
	if err != nil {
		return fmt.Errorf("Error writing config: %s", err)
	}

	return nil
}

func loadConfig(configPath string) (*AppConfig, error) {
	bytes, err := os.ReadFile(configPath)

	var appConfig AppConfig

	if _, ok := err.(*os.PathError); ok {
		// Create the config file
		dataPath, err := xdg.DataFile("njournal/data/njournal.db")

		if err != nil {
			return nil, fmt.Errorf("Error getting data path: %s", err)
		}

		appConfig = AppConfig{
			Width:        800,
			Height:       600,
			DataBasePath: dataPath,
		}

		saveConfig(configPath, appConfig)
	}

	if err != nil {
		return nil, fmt.Errorf("Error reading config file: %s", err)
	}

	if err := json.Unmarshal(bytes, &appConfig); err != nil {
		return nil, fmt.Errorf("Error unmarshalling config file: %s", err)
	}

	return &appConfig, nil
}
