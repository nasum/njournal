package main

import (
	"changeme/ent"
	"context"
	"fmt"
)

func GetDB(ctx context.Context, databasePath, buildType string) (*ent.Client, error) {
	databaseSetup := fmt.Sprintf("file:%s/njournal.%s.db?mode=rwc&cache=shared&_fk=1", databasePath, buildType)

	client, err := ent.Open("sqlite3", databaseSetup)
	if err != nil {
		return nil, err
	}

	if err := client.Schema.Create(ctx); err != nil {
		return nil, err
	}
	return client, nil
}
