// Code generated by ent, DO NOT EDIT.

package ent

import (
	"changeme/ent/note"
	"context"
	"errors"
	"fmt"
	"time"

	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
)

// NoteCreate is the builder for creating a Note entity.
type NoteCreate struct {
	config
	mutation *NoteMutation
	hooks    []Hook
}

// SetContent sets the "content" field.
func (nc *NoteCreate) SetContent(s string) *NoteCreate {
	nc.mutation.SetContent(s)
	return nc
}

// SetCreatedAt sets the "created_at" field.
func (nc *NoteCreate) SetCreatedAt(t time.Time) *NoteCreate {
	nc.mutation.SetCreatedAt(t)
	return nc
}

// SetUpdatedAt sets the "updated_at" field.
func (nc *NoteCreate) SetUpdatedAt(t time.Time) *NoteCreate {
	nc.mutation.SetUpdatedAt(t)
	return nc
}

// Mutation returns the NoteMutation object of the builder.
func (nc *NoteCreate) Mutation() *NoteMutation {
	return nc.mutation
}

// Save creates the Note in the database.
func (nc *NoteCreate) Save(ctx context.Context) (*Note, error) {
	return withHooks(ctx, nc.sqlSave, nc.mutation, nc.hooks)
}

// SaveX calls Save and panics if Save returns an error.
func (nc *NoteCreate) SaveX(ctx context.Context) *Note {
	v, err := nc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (nc *NoteCreate) Exec(ctx context.Context) error {
	_, err := nc.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (nc *NoteCreate) ExecX(ctx context.Context) {
	if err := nc.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (nc *NoteCreate) check() error {
	if _, ok := nc.mutation.Content(); !ok {
		return &ValidationError{Name: "content", err: errors.New(`ent: missing required field "Note.content"`)}
	}
	if _, ok := nc.mutation.CreatedAt(); !ok {
		return &ValidationError{Name: "created_at", err: errors.New(`ent: missing required field "Note.created_at"`)}
	}
	if _, ok := nc.mutation.UpdatedAt(); !ok {
		return &ValidationError{Name: "updated_at", err: errors.New(`ent: missing required field "Note.updated_at"`)}
	}
	return nil
}

func (nc *NoteCreate) sqlSave(ctx context.Context) (*Note, error) {
	if err := nc.check(); err != nil {
		return nil, err
	}
	_node, _spec := nc.createSpec()
	if err := sqlgraph.CreateNode(ctx, nc.driver, _spec); err != nil {
		if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return nil, err
	}
	id := _spec.ID.Value.(int64)
	_node.ID = int(id)
	nc.mutation.id = &_node.ID
	nc.mutation.done = true
	return _node, nil
}

func (nc *NoteCreate) createSpec() (*Note, *sqlgraph.CreateSpec) {
	var (
		_node = &Note{config: nc.config}
		_spec = sqlgraph.NewCreateSpec(note.Table, sqlgraph.NewFieldSpec(note.FieldID, field.TypeInt))
	)
	if value, ok := nc.mutation.Content(); ok {
		_spec.SetField(note.FieldContent, field.TypeString, value)
		_node.Content = value
	}
	if value, ok := nc.mutation.CreatedAt(); ok {
		_spec.SetField(note.FieldCreatedAt, field.TypeTime, value)
		_node.CreatedAt = value
	}
	if value, ok := nc.mutation.UpdatedAt(); ok {
		_spec.SetField(note.FieldUpdatedAt, field.TypeTime, value)
		_node.UpdatedAt = value
	}
	return _node, _spec
}

// NoteCreateBulk is the builder for creating many Note entities in bulk.
type NoteCreateBulk struct {
	config
	err      error
	builders []*NoteCreate
}

// Save creates the Note entities in the database.
func (ncb *NoteCreateBulk) Save(ctx context.Context) ([]*Note, error) {
	if ncb.err != nil {
		return nil, ncb.err
	}
	specs := make([]*sqlgraph.CreateSpec, len(ncb.builders))
	nodes := make([]*Note, len(ncb.builders))
	mutators := make([]Mutator, len(ncb.builders))
	for i := range ncb.builders {
		func(i int, root context.Context) {
			builder := ncb.builders[i]
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*NoteMutation)
				if !ok {
					return nil, fmt.Errorf("unexpected mutation type %T", m)
				}
				if err := builder.check(); err != nil {
					return nil, err
				}
				builder.mutation = mutation
				var err error
				nodes[i], specs[i] = builder.createSpec()
				if i < len(mutators)-1 {
					_, err = mutators[i+1].Mutate(root, ncb.builders[i+1].mutation)
				} else {
					spec := &sqlgraph.BatchCreateSpec{Nodes: specs}
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, ncb.driver, spec); err != nil {
						if sqlgraph.IsConstraintError(err) {
							err = &ConstraintError{msg: err.Error(), wrap: err}
						}
					}
				}
				if err != nil {
					return nil, err
				}
				mutation.id = &nodes[i].ID
				if specs[i].ID.Value != nil {
					id := specs[i].ID.Value.(int64)
					nodes[i].ID = int(id)
				}
				mutation.done = true
				return nodes[i], nil
			})
			for i := len(builder.hooks) - 1; i >= 0; i-- {
				mut = builder.hooks[i](mut)
			}
			mutators[i] = mut
		}(i, ctx)
	}
	if len(mutators) > 0 {
		if _, err := mutators[0].Mutate(ctx, ncb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX is like Save, but panics if an error occurs.
func (ncb *NoteCreateBulk) SaveX(ctx context.Context) []*Note {
	v, err := ncb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (ncb *NoteCreateBulk) Exec(ctx context.Context) error {
	_, err := ncb.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ncb *NoteCreateBulk) ExecX(ctx context.Context) {
	if err := ncb.Exec(ctx); err != nil {
		panic(err)
	}
}
