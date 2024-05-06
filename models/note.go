package models

import (
	"time"

	"github.com/google/uuid"
)

type Note struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey;default:(gen_random_uuid())"`
	Title     string
	Content   string
	Deleted   bool `gorm:"default:false"`
	UpdatedAt time.Time
	CreatedAt time.Time
}
