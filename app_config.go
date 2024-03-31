package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"os"

	"github.com/adrg/xdg"
)

type AppConfig struct {
	Width         int    `json:"width"`
	Height        int    `json:"height"`
	DataBasePath  string `json:"databasePath"`
	ImageBasePath string `json:"imageBasePath"`
	ImagePath     string `json:"imagePath"`
}

func saveConfig(configPath string, appConfig AppConfig) error {
	b, err := json.Marshal(appConfig)
	if err != nil {
		return fmt.Errorf("error marshalling config: %s", err)
	}

	buf := new(bytes.Buffer)
	err = json.Indent(buf, b, "", "  ")

	if err != nil {
		return fmt.Errorf("error indenting config: %s", err)
	}

	err = os.WriteFile(configPath, buf.Bytes(), 0644)
	if err != nil {
		return fmt.Errorf("error writing config: %s", err)
	}

	return nil
}

func loadConfig(configPath string) (*AppConfig, error) {
	dataPath, err := xdg.DataFile("njournal/data")

	if err != nil {
		return nil, fmt.Errorf("error getting data path: %s", err)
	}

	imageBasePath := xdg.UserDirs.Pictures
	imagePath := "/njournal"

	if _, err := os.Stat(fmt.Sprintf("%v/%v", imageBasePath, imagePath)); os.IsNotExist(err) {
		err = os.MkdirAll(imagePath, 0755)
		if err != nil {
			return nil, fmt.Errorf("error creating data directory: %s", err)
		}
	}

	appConfig := AppConfig{
		Width:         800,
		Height:        600,
		DataBasePath:  dataPath,
		ImageBasePath: imageBasePath,
		ImagePath:     imagePath,
	}

	if err := saveConfig(configPath, appConfig); err != nil {
		return nil, err
	}

	return &appConfig, nil
}
