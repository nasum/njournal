package main

import (
	"context"
	"encoding/base64"
	"fmt"
	"net/http"
	"njournal/models"
	"os"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Image struct {
	ID        uuid.UUID `json:"id"`
	Data      string    `json:"data"`
	UpdatedAt time.Time `json:"updatedAt"`
	CreatedAt time.Time `json:"createdAt"`
}

type imageService struct {
	db  *gorm.DB
	ctx context.Context
}

func (i *imageService) Create(imagePath string) error {
	today := time.Now()
	image := models.Image{
		ID:        uuid.New(),
		Path:      imagePath,
		UpdatedAt: today,
		CreatedAt: today,
	}
	err := i.db.Create(&image).Error

	if err != nil {
		return err
	}

	return nil
}

func (i *imageService) List(basePath string) ([]Image, error) {
	var ims []*models.Image
	err := i.db.Find(&ims).Error

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
