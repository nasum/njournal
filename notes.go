package main

import (
	"changeme/ent"
	"context"
	"time"
)

type Note struct {
	ID      int
	Title   string
	Content string
}

type NotesService struct {
	client *ent.Client
	ctx    context.Context
}

func (n *NotesService) Create(note Note) Note {
	today := time.Now()
	savedNote, err := n.client.Note.Create().SetContent(note.Content).SetTitle(note.Title).SetUpdatedAt(today).SetCreatedAt(today).Save(n.ctx)
	if err != nil {
		panic(err)
	}
	return Note{
		ID:      savedNote.ID,
		Title:   savedNote.Title,
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

func (n *NotesService) List() string {
	n.client.Note.Query().All(n.ctx)
	return "Hello World!"
}
