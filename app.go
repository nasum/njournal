package main

import (
	"changeme/ent"
	"context"
	"fmt"

	"github.com/wailsapp/wails/v2/pkg/runtime"

	_ "github.com/mattn/go-sqlite3"
)

// App struct
type App struct {
	ctx         context.Context
	noteService *NotesService
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

	runtime.LogDebug(a.ctx, "Startup called")
	runtime.LogDebug(a.ctx, "Build Type: "+env.BuildType)

	// if env.BuildType == "dev" {
	// 	runtime.WindowHide(a.ctx)
	// 	runtime.LogDebug(a.ctx, "WindowHide called")
	// }

	runtime.LogDebug(a.ctx, "Loading DB")
	client := a.GetDB()
	a.noteService = &NotesService{client: client, ctx: a.ctx}

	runtime.LogDebug(a.ctx, "Startup complete")

}

func (a *App) GetDB() *ent.Client {
	client, err := ent.Open("sqlite3", "file:njournal.db?mode=rwc&cache=shared&_fk=1")
	if err != nil {
		panic(err)
	}
	if err := client.Schema.Create(a.ctx); err != nil {
		panic(err)
	}
	return client
}

// Create project
func (a *App) CreateProject(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// Get projects
func (a *App) GetProjects() []string {
	return []string{"Project 1", "Project 2"}
}

// Create note
func (a *App) CreateNote(title string, content string) Note {
	note := a.noteService.Create(Note{Title: title, Content: content})
	return note
}

// List notes
func (a *App) ListNotes() []Note {
	return a.noteService.List()
}
