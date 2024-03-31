package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// Image holds the schema definition for the Image entity.
type Image struct {
	ent.Schema
}

// Fields of the Image.
func (Image) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).Default(uuid.New),
		field.String("path"),
		field.Bool("deleted").Default(false),
		field.Time("created_at"),
		field.Time("updated_at"),
	}
}

// Edges of the Image.
func (Image) Edges() []ent.Edge {
	return nil
}
