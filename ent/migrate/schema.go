// Code generated by ent, DO NOT EDIT.

package migrate

import (
	"entgo.io/ent/dialect/sql/schema"
	"entgo.io/ent/schema/field"
)

var (
	// NotesColumns holds the columns for the "notes" table.
	NotesColumns = []*schema.Column{
		{Name: "id", Type: field.TypeUUID},
		{Name: "content", Type: field.TypeString},
		{Name: "created_at", Type: field.TypeTime},
		{Name: "updated_at", Type: field.TypeTime},
		{Name: "deleted", Type: field.TypeBool, Default: false},
	}
	// NotesTable holds the schema information for the "notes" table.
	NotesTable = &schema.Table{
		Name:       "notes",
		Columns:    NotesColumns,
		PrimaryKey: []*schema.Column{NotesColumns[0]},
	}
	// Tables holds all the tables in the schema.
	Tables = []*schema.Table{
		NotesTable,
	}
)

func init() {
}
