// Code generated by ent, DO NOT EDIT.

package ent

import (
	"changeme/ent/note"
	"changeme/ent/predicate"
	"context"
	"errors"
	"fmt"
	"time"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
)

// NoteUpdate is the builder for updating Note entities.
type NoteUpdate struct {
	config
	hooks    []Hook
	mutation *NoteMutation
}

// Where appends a list predicates to the NoteUpdate builder.
func (nu *NoteUpdate) Where(ps ...predicate.Note) *NoteUpdate {
	nu.mutation.Where(ps...)
	return nu
}

// SetContent sets the "content" field.
func (nu *NoteUpdate) SetContent(s string) *NoteUpdate {
	nu.mutation.SetContent(s)
	return nu
}

// SetNillableContent sets the "content" field if the given value is not nil.
func (nu *NoteUpdate) SetNillableContent(s *string) *NoteUpdate {
	if s != nil {
		nu.SetContent(*s)
	}
	return nu
}

// SetCreatedAt sets the "created_at" field.
func (nu *NoteUpdate) SetCreatedAt(t time.Time) *NoteUpdate {
	nu.mutation.SetCreatedAt(t)
	return nu
}

// SetNillableCreatedAt sets the "created_at" field if the given value is not nil.
func (nu *NoteUpdate) SetNillableCreatedAt(t *time.Time) *NoteUpdate {
	if t != nil {
		nu.SetCreatedAt(*t)
	}
	return nu
}

// SetUpdatedAt sets the "updated_at" field.
func (nu *NoteUpdate) SetUpdatedAt(t time.Time) *NoteUpdate {
	nu.mutation.SetUpdatedAt(t)
	return nu
}

// SetNillableUpdatedAt sets the "updated_at" field if the given value is not nil.
func (nu *NoteUpdate) SetNillableUpdatedAt(t *time.Time) *NoteUpdate {
	if t != nil {
		nu.SetUpdatedAt(*t)
	}
	return nu
}

// SetDeleted sets the "deleted" field.
func (nu *NoteUpdate) SetDeleted(b bool) *NoteUpdate {
	nu.mutation.SetDeleted(b)
	return nu
}

// SetNillableDeleted sets the "deleted" field if the given value is not nil.
func (nu *NoteUpdate) SetNillableDeleted(b *bool) *NoteUpdate {
	if b != nil {
		nu.SetDeleted(*b)
	}
	return nu
}

// Mutation returns the NoteMutation object of the builder.
func (nu *NoteUpdate) Mutation() *NoteMutation {
	return nu.mutation
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (nu *NoteUpdate) Save(ctx context.Context) (int, error) {
	return withHooks(ctx, nu.sqlSave, nu.mutation, nu.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (nu *NoteUpdate) SaveX(ctx context.Context) int {
	affected, err := nu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (nu *NoteUpdate) Exec(ctx context.Context) error {
	_, err := nu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (nu *NoteUpdate) ExecX(ctx context.Context) {
	if err := nu.Exec(ctx); err != nil {
		panic(err)
	}
}

func (nu *NoteUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := sqlgraph.NewUpdateSpec(note.Table, note.Columns, sqlgraph.NewFieldSpec(note.FieldID, field.TypeInt))
	if ps := nu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := nu.mutation.Content(); ok {
		_spec.SetField(note.FieldContent, field.TypeString, value)
	}
	if value, ok := nu.mutation.CreatedAt(); ok {
		_spec.SetField(note.FieldCreatedAt, field.TypeTime, value)
	}
	if value, ok := nu.mutation.UpdatedAt(); ok {
		_spec.SetField(note.FieldUpdatedAt, field.TypeTime, value)
	}
	if value, ok := nu.mutation.Deleted(); ok {
		_spec.SetField(note.FieldDeleted, field.TypeBool, value)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, nu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{note.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return 0, err
	}
	nu.mutation.done = true
	return n, nil
}

// NoteUpdateOne is the builder for updating a single Note entity.
type NoteUpdateOne struct {
	config
	fields   []string
	hooks    []Hook
	mutation *NoteMutation
}

// SetContent sets the "content" field.
func (nuo *NoteUpdateOne) SetContent(s string) *NoteUpdateOne {
	nuo.mutation.SetContent(s)
	return nuo
}

// SetNillableContent sets the "content" field if the given value is not nil.
func (nuo *NoteUpdateOne) SetNillableContent(s *string) *NoteUpdateOne {
	if s != nil {
		nuo.SetContent(*s)
	}
	return nuo
}

// SetCreatedAt sets the "created_at" field.
func (nuo *NoteUpdateOne) SetCreatedAt(t time.Time) *NoteUpdateOne {
	nuo.mutation.SetCreatedAt(t)
	return nuo
}

// SetNillableCreatedAt sets the "created_at" field if the given value is not nil.
func (nuo *NoteUpdateOne) SetNillableCreatedAt(t *time.Time) *NoteUpdateOne {
	if t != nil {
		nuo.SetCreatedAt(*t)
	}
	return nuo
}

// SetUpdatedAt sets the "updated_at" field.
func (nuo *NoteUpdateOne) SetUpdatedAt(t time.Time) *NoteUpdateOne {
	nuo.mutation.SetUpdatedAt(t)
	return nuo
}

// SetNillableUpdatedAt sets the "updated_at" field if the given value is not nil.
func (nuo *NoteUpdateOne) SetNillableUpdatedAt(t *time.Time) *NoteUpdateOne {
	if t != nil {
		nuo.SetUpdatedAt(*t)
	}
	return nuo
}

// SetDeleted sets the "deleted" field.
func (nuo *NoteUpdateOne) SetDeleted(b bool) *NoteUpdateOne {
	nuo.mutation.SetDeleted(b)
	return nuo
}

// SetNillableDeleted sets the "deleted" field if the given value is not nil.
func (nuo *NoteUpdateOne) SetNillableDeleted(b *bool) *NoteUpdateOne {
	if b != nil {
		nuo.SetDeleted(*b)
	}
	return nuo
}

// Mutation returns the NoteMutation object of the builder.
func (nuo *NoteUpdateOne) Mutation() *NoteMutation {
	return nuo.mutation
}

// Where appends a list predicates to the NoteUpdate builder.
func (nuo *NoteUpdateOne) Where(ps ...predicate.Note) *NoteUpdateOne {
	nuo.mutation.Where(ps...)
	return nuo
}

// Select allows selecting one or more fields (columns) of the returned entity.
// The default is selecting all fields defined in the entity schema.
func (nuo *NoteUpdateOne) Select(field string, fields ...string) *NoteUpdateOne {
	nuo.fields = append([]string{field}, fields...)
	return nuo
}

// Save executes the query and returns the updated Note entity.
func (nuo *NoteUpdateOne) Save(ctx context.Context) (*Note, error) {
	return withHooks(ctx, nuo.sqlSave, nuo.mutation, nuo.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (nuo *NoteUpdateOne) SaveX(ctx context.Context) *Note {
	node, err := nuo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (nuo *NoteUpdateOne) Exec(ctx context.Context) error {
	_, err := nuo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (nuo *NoteUpdateOne) ExecX(ctx context.Context) {
	if err := nuo.Exec(ctx); err != nil {
		panic(err)
	}
}

func (nuo *NoteUpdateOne) sqlSave(ctx context.Context) (_node *Note, err error) {
	_spec := sqlgraph.NewUpdateSpec(note.Table, note.Columns, sqlgraph.NewFieldSpec(note.FieldID, field.TypeInt))
	id, ok := nuo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "id", err: errors.New(`ent: missing "Note.id" for update`)}
	}
	_spec.Node.ID.Value = id
	if fields := nuo.fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, note.FieldID)
		for _, f := range fields {
			if !note.ValidColumn(f) {
				return nil, &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
			}
			if f != note.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, f)
			}
		}
	}
	if ps := nuo.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := nuo.mutation.Content(); ok {
		_spec.SetField(note.FieldContent, field.TypeString, value)
	}
	if value, ok := nuo.mutation.CreatedAt(); ok {
		_spec.SetField(note.FieldCreatedAt, field.TypeTime, value)
	}
	if value, ok := nuo.mutation.UpdatedAt(); ok {
		_spec.SetField(note.FieldUpdatedAt, field.TypeTime, value)
	}
	if value, ok := nuo.mutation.Deleted(); ok {
		_spec.SetField(note.FieldDeleted, field.TypeBool, value)
	}
	_node = &Note{config: nuo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues
	if err = sqlgraph.UpdateNode(ctx, nuo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{note.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return nil, err
	}
	nuo.mutation.done = true
	return _node, nil
}
