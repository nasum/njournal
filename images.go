package main

import (
	"changeme/ent"
	"context"
	"time"
)

type imageService struct {
	client *ent.Client
	ctx    context.Context
}

func (i *imageService) Create(imagePath string) error {
	today := time.Now()
	_, err := i.client.Image.Create().SetPath(imagePath).SetUpdatedAt(today).SetCreatedAt(today).Save(i.ctx)

	if err != nil {
		return err
	}

	return nil
}
