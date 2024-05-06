package models

import (
	"time"

	"github.com/google/uuid"
)

type Image struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey;default:(gen_random_uuid())"`
	Path      string
	Deleted   bool `gorm:"default:false"`
	UpdatedAt time.Time
	CreatedAt time.Time
}
