package main

import (
	"changeme/ent"
	"context"
	"fmt"
	"os"
	"path/filepath"

	"github.com/adrg/xdg"
	"github.com/google/uuid"
	"github.com/wailsapp/wails/v2/pkg/runtime"

	_ "github.com/mattn/go-sqlite3"
)

// App struct
type App struct {
	ctx          context.Context
	client       *ent.Client
	noteService  *NotesService
	imageService *imageService
	config       *AppConfig
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	env := runtime.Environment(a.ctx)
	var err error

	runtime.LogDebug(a.ctx, "Startup called")
	runtime.LogDebug(a.ctx, "Build Type: "+env.BuildType)

	configPath, err := xdg.ConfigFile(fmt.Sprintf("njournal/config.%v.json", env.BuildType))
	if err != nil {
		fmt.Println("Error getting config path:", err)
		return
	}

	appConfig, err := loadConfig(configPath)

	if err != nil {
		fmt.Println("Error loading config:", err)
		return
	}

	a.config = appConfig

	runtime.LogDebug(a.ctx, "Loading DB")
	runtime.LogDebug(a.ctx, "Database Path: "+a.config.DataBasePath)

	a.client, err = GetDB(a.ctx, a.config.DataBasePath, env.BuildType)

	if err != nil {
		runtime.LogErrorf(a.ctx, "Error loading DB: "+err.Error())
		return
	}

	a.noteService = &NotesService{client: a.client, ctx: a.ctx}
	a.imageService = &imageService{client: a.client, ctx: a.ctx}

	runtime.LogDebug(a.ctx, "Startup complete")

}

func (a *App) GetNote(id uuid.UUID) (*Note, error) {
	note, err := a.noteService.GetNoteByID(id)
	return note, err
}

// Create note
func (a *App) CreateNote(content string) (*Note, error) {
	note, err := a.noteService.Create(Note{Content: content})

	if err != nil {
		return nil, err
	}

	return note, nil
}

// Update note
func (a *App) UpdateNote(id uuid.UUID, content string) (*Note, error) {
	note, error := a.noteService.GetNoteByID(id)

	if error != nil {
		return nil, error
	}

	note.Content = content

	note, error = a.noteService.Update(*note)

	if error != nil {
		return nil, error
	}

	return note, nil
}

// List notes
func (a *App) ListNotes() ([]Note, error) {
	notes, err := a.noteService.List()

	if err != nil {
		return nil, err
	}

	return notes, nil
}

func (a *App) CreateImageFromLocal(fileName string, data []byte) error {
	path := filepath.Join(a.config.ImageBasePath, a.config.ImagePath, fileName)
	err := os.WriteFile(path, data, 0644)

	if err != nil {
		return err
	}

	runtime.LogDebug(a.ctx, "Image saved to: "+path)
	err = a.imageService.Create(fmt.Sprintf("%v/%v", a.config.ImagePath, fileName))

	if err != nil {
		return err
	}

	return nil
}
