package main

import (
	"context"
	"strings"
	"time"

	"njournal/models"

	"github.com/google/uuid"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"gorm.io/gorm"
)

type Note struct {
	ID        uuid.UUID
	Title     string
	Content   string
	UpdatedAt time.Time
	CreatedAt time.Time
}

func createNote(rowNote *models.Note) Note {
	return Note{
		ID:        rowNote.ID,
		Title:     rowNote.Title,
		Content:   rowNote.Content,
		UpdatedAt: rowNote.UpdatedAt,
		CreatedAt: rowNote.CreatedAt,
	}
}

func createNoteList(rowNotes []*models.Note) []Note {
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
	db  *gorm.DB
	ctx context.Context
}

func (n *NotesService) Create(noteArgs Note) (*Note, error) {
	today := time.Now()
	title := CreateTitle(noteArgs.Content)

	note := &models.Note{
		ID:        uuid.New(),
		Title:     title,
		Content:   noteArgs.Content,
		UpdatedAt: today,
		CreatedAt: today,
	}
	err := n.db.Create(&note).Error

	if err != nil {
		return nil, err
	}

	return &Note{
		ID:      note.ID,
		Content: note.Content,
	}, nil
}

func (n *NotesService) GetNoteByID(id uuid.UUID) (*Note, error) {
	runtime.LogDebugf(n.ctx, "Getting note by ID: %d", id)
	note := &models.Note{}
	err := n.db.Where("id = ?", id).Take(note).Error
	if err != nil {
		return nil, err
	}

	noteToReturn := createNote(note)

	return &noteToReturn, nil
}

func (n *NotesService) Update(noteToUpdate Note) (*Note, error) {
	today := time.Now()
	title := CreateTitle(noteToUpdate.Content)

	note := &models.Note{}
	err := n.db.Where("id = ?", noteToUpdate.ID).Take(note).Error
	if err != nil {
		return nil, err
	}

	note.Title = title
	note.Content = noteToUpdate.Content
	note.UpdatedAt = today

	err = n.db.Save(&note).Error

	if err != nil {
		return nil, err
	}

	noteToReturn := createNote(note)

	return &noteToReturn, nil
}

func (n *NotesService) List() ([]Note, error) {
	var notes []*models.Note
	err := n.db.Find(&notes).Error

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
