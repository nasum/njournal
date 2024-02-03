// Code generated by ent, DO NOT EDIT.

package ent

import (
	"changeme/ent/note"
	"changeme/ent/schema"
)

// The init function reads all schema descriptors with runtime code
// (default values, validators, hooks and policies) and stitches it
// to their package variables.
func init() {
	noteFields := schema.Note{}.Fields()
	_ = noteFields
	// noteDescDeleted is the schema descriptor for deleted field.
	noteDescDeleted := noteFields[3].Descriptor()
	// note.DefaultDeleted holds the default value on creation for the deleted field.
	note.DefaultDeleted = noteDescDeleted.Default.(bool)
}
