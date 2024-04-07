package main

import (
	"changeme/ent"
	"changeme/ent/note"
	"context"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type Note struct {
	ID        uuid.UUID
	Title     string
	Content   string
	UpdatedAt time.Time
	CreatedAt time.Time
}

func createNote(rowNote *ent.Note) Note {
	return Note{
		ID:        rowNote.ID,
		Title:     rowNote.Title,
		Content:   rowNote.Content,
		UpdatedAt: rowNote.UpdatedAt,
		CreatedAt: rowNote.CreatedAt,
	}
}

func createNoteList(rowNotes []*ent.Note) []Note {
	var notes []Note
	for _, rowNote := range rowNotes {
		notes = append(notes, Note{
			ID:        rowNote.ID,
			Title:     rowNote.Title,
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

func (n *NotesService) Create(note Note) (*Note, error) {
	today := time.Now()
	title := CreateTitle(note.Content)

	savedNote, err := n.client.Note.Create().
		SetTitle(title).
		SetContent(note.Content).
		SetUpdatedAt(today).
		SetCreatedAt(today).
		Save(n.ctx)

	if err != nil {
		return nil, err
	}

	return &Note{
		ID:      savedNote.ID,
		Content: savedNote.Content,
	}, nil
}

func (n *NotesService) GetNoteByID(id uuid.UUID) (*Note, error) {
	runtime.LogDebugf(n.ctx, "Getting note by ID: %d", id)
	note, err := n.client.Note.Get(n.ctx, id)
	if err != nil {
		return nil, err
	}

	noteToReturn := createNote(note)

	return &noteToReturn, nil
}

func (n *NotesService) Update(noteToUpdate Note) (*Note, error) {
	today := time.Now()
	title := CreateTitle(noteToUpdate.Content)

	updatedNote, err := n.client.Note.UpdateOneID(noteToUpdate.ID).
		SetTitle(title).
		SetContent(noteToUpdate.Content).
		SetUpdatedAt(today).
		Save(n.ctx)

	if err != nil {
		return nil, err
	}

	noteToReturn := createNote(updatedNote)

	return &noteToReturn, nil
}

func (n *NotesService) Delete(id uuid.UUID) error {
	today := time.Now()

	_, err := n.client.Note.UpdateOneID(id).
		SetUpdatedAt(today).
		SetDeleted(true).
		Save(n.ctx)

	if err != nil {
		return err
	}

	return nil
}

func (n *NotesService) SearchByTitle(title string) ([]Note, error) {
	notes, err := n.client.Note.Query().Where(note.TitleContains(title)).All(n.ctx)

	if err != nil {
		return nil, err
	}

	return createNoteList(notes), nil
}

func (n *NotesService) List() ([]Note, error) {
	notes, err := n.client.Note.Query().Where(note.DeletedEQ(false)).Order(ent.Desc("updated_at")).All(n.ctx)

	if err != nil {
		return nil, err
	}

	notesToReturn := createNoteList(notes)

	return notesToReturn, nil
}

func CreateTitle(content string) string {
	head := strings.Split(content, "\n")[0]
	head = strings.ReplaceAll(head, "#", "")
	return head
}
