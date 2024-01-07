package main

import (
	"context"
	"fmt"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
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

	if env.BuildType == "dev" {
		runtime.WindowHide(a.ctx)
		runtime.LogDebug(a.ctx, "WindowHide called")
	}

}

// Create project
func (a *App) CreateProject(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// Get projects
func (a *App) GetProjects() []string {
	return []string{"Project 1", "Project 2"}
}
