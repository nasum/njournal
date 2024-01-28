package main

import (
	"changeme/ent"
	"context"
	"time"
)

type Note struct {
	ID        int
	Content   string
	UpdatedAt time.Time
	CreatedAt time.Time
}

func createNoteList(rowNotes []*ent.Note) []Note {
	var notes []Note
	for _, rowNote := range rowNotes {
		notes = append(notes, Note{
			ID:        rowNote.ID,
			Content:   rowNote.Content,
			UpdatedAt: rowNote.UpdatedAt,
			CreatedAt: rowNote.CreatedAt,
		})
	}
	return notes
}

type NotesService struct {
	client *ent.Client
	ctx    context.Context
}

func (n *NotesService) Create(note Note) Note {
	today := time.Now()
	savedNote, err := n.client.Note.Create().SetContent(note.Content).SetUpdatedAt(today).SetCreatedAt(today).Save(n.ctx)
	if err != nil {
		panic(err)
	}
	return Note{
		ID:      savedNote.ID,
		Content: savedNote.Content,
	}
}

func (n *NotesService) Get() string {
	return "Hello World!"
}

func (n *NotesService) Update() string {
	return "Hello World!"
}

func (n *NotesService) Delete() string {
	return "Hello World!"
}

func (n *NotesService) Search() string {
	return "Hello World!"
}

func (n *NotesService) List() []Note {
	notes, err := n.client.Note.Query().All(n.ctx)
	if err != nil {
		panic(err)
	}

	return createNoteList(notes)
}
