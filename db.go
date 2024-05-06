package main

import (
	"context"
	"fmt"

	"njournal/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func GetDB(ctx context.Context, databasePath, buildType string) (*gorm.DB, error) {
	databaseSetup := fmt.Sprintf("file:%s/njournal.%s.db?mode=rwc&cache=shared&_fk=1", databasePath, buildType)
	db, err := gorm.Open(sqlite.Open(databaseSetup), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	db.AutoMigrate(&models.Note{})
	db.AutoMigrate(&models.Image{})

	return db, nil
}
