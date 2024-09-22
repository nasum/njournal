package main

import (
	"context"
	"errors"
	"fmt"
	"os"

	"njournal/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func GetDB(ctx context.Context, databasePath, buildType string) (*gorm.DB, error) {

	if _, err := os.Stat(databasePath); os.IsNotExist(err) {
		err = os.MkdirAll(databasePath, 0755)
		if err != nil {
			return nil, fmt.Errorf("error creating data directory: %s", err)
		}
	}

	databaseSetup := fmt.Sprintf("file:%s/njournal.%s.db?mode=rwc&cache=shared&_fk=1", databasePath, buildType)
	db, err := gorm.Open(sqlite.Open(databaseSetup), &gorm.Config{})
	if err != nil {
		return nil, errors.New(fmt.Sprintf("error opening database: %s: database path %s", err, databaseSetup))
	}

	db.AutoMigrate(&models.Note{})
	db.AutoMigrate(&models.Image{})

	return db, nil
}
