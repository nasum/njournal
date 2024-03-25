package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// Note holds the schema definition for the Note entity.
type Note struct {
	ent.Schema
}

// Fields of the Note.
func (Note) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).Default(uuid.New),
		field.String("content"),
		field.Time("created_at"),
		field.Time("updated_at"),
		field.Bool("deleted").Default(false),
	}
}

// Edges of the Note.
func (Note) Edges() []ent.Edge {
	return nil
}
