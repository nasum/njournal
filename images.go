package main

import (
	"changeme/ent"
	"context"
	"encoding/base64"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/google/uuid"
)

type Image struct {
	ID        uuid.UUID
	Data      string
	UpdatedAt time.Time
	CreatedAt time.Time
}

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

func (i *imageService) List(basePath string) ([]Image, error) {
	ims, err := i.client.Image.Query().All(i.ctx)

	if err != nil {
		return nil, err
	}

	images := make([]Image, len(ims))

	for idx, im := range ims {
		data, err := os.ReadFile(fmt.Sprintf("%v%v", basePath, im.Path))

		if err != nil {
			return nil, err
		}

		mimeType := http.DetectContentType(data)
		encodedData := base64.StdEncoding.EncodeToString(data)

		srcString := fmt.Sprintf("data:%v;base64,%v", mimeType, encodedData)

		images[idx] = Image{
			ID:        im.ID,
			Data:      srcString,
			UpdatedAt: im.UpdatedAt,
			CreatedAt: im.CreatedAt,
		}
	}

	return images, nil
}
