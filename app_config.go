package main

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/adrg/xdg"
)

type AppConfig struct {
	Width        int    `json:"width"`
	Height       int    `json:"height"`
	DataBasePath string `json:"databasePath"`
}

func saveConfig(configPath string, appConfig AppConfig) error {
	bytes, err := json.Marshal(appConfig)
	if err != nil {
		return fmt.Errorf("error marshalling config: %s", err)
	}

	err = os.WriteFile(configPath, bytes, 0644)
	if err != nil {
		return fmt.Errorf("error writing config: %s", err)
	}

	return nil
}

func loadConfig(configPath string) (*AppConfig, error) {
	bytes, err := os.ReadFile(configPath)
	if _, ok := err.(*os.PathError); ok {
		dataPath, err := xdg.DataFile("njournal/data")

		if err != nil {
			return nil, fmt.Errorf("error getting data path: %s", err)
		}

		appConfig := AppConfig{
			Width:        800,
			Height:       600,
			DataBasePath: dataPath,
		}

		if err := saveConfig(configPath, appConfig); err != nil {
			return nil, err
		}

		return &appConfig, nil
	}

	var appConfig AppConfig

	if err := json.Unmarshal(bytes, &appConfig); err != nil {
		return nil, fmt.Errorf("error unmarshalling config file: %s", err)
	}

	return &appConfig, nil
}
