# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

njournal is a desktop markdown-based memo/note-taking application built with Wails v2 (Go backend, React frontend). The app is currently in alpha stage (v0.0.26) and features a rich text editor using Lexical, SQLite database for storage, and desktop integration.

## Development Commands

### Primary Development
- `task` or `task default` - Start development server with hot reload (runs `wails dev -tags webkit2_41`)
- `task release` - Create and push git tag for release

### Frontend Development (in /frontend directory)
- `npm run dev` - Start Vite development server
- `npm run build` - Build frontend (`tsc && vite build`)  
- `npm run lint` - Run Biome linter
- `npm run lint:fix` - Run Biome linter with auto-fix
- `npm run format` - Format code with Biome

### Building Application
- `wails build` - Build application for current platform
- `wails dev` - Development mode with hot reload

## Architecture

### Backend (Go)
- **Wails v2** framework for desktop app development
- **GORM** ORM with SQLite driver for database operations
- **Models**: `Note` and `Image` entities with UUID primary keys
- **Services**: `NotesService` and `imageService` for business logic
- **Configuration**: XDG-compliant config file management with environment-specific database files

Key files:
- `main.go` - Entry point and Wails configuration
- `app.go` - Main app struct with exposed methods for frontend
- `db.go` - Database setup and migrations
- `notes.go` - Notes service implementation
- `images.go` - Image management service
- `models/` - Database models (Note, Image)

### Frontend (React + TypeScript)
- **React 19** with **TypeScript**
- **Vite** build tool and dev server
- **Lexical** rich text editor with custom plugins (CodeHighlight, LinkPlugin)
- **Jotai** for state management
- **styled-components** for styling
- **React Router** for navigation

Key components:
- `App.tsx` - Main application layout with sidebar and routing
- `components/pages/notes/Note.tsx` - Note editing interface
- `components/common/editor/Editor.tsx` - Lexical rich text editor
- `hooks/useNotes.ts` - Notes management hook
- `lib/notes.ts` - Notes API interface

### Database Schema
- **Notes**: ID (UUID), Title, Content, Deleted (boolean), UpdatedAt, CreatedAt
- **Images**: ID (UUID), Path, Deleted (boolean), UpdatedAt, CreatedAt
- Database files: `njournal.{buildType}.db` in XDG data directory

## Code Style and Tools

- **Biome** for TypeScript/React linting and formatting
- **Node.js >= 21.5.0** required for frontend development
- Go modules for backend dependencies
- **TypeScript** strict mode enabled

## Key Integration Points

- Wails bindings expose Go methods to frontend via `wailsjs/go/main/App`
- Frontend communicates with backend through Wails runtime
- Image handling: frontend uploads, backend saves to filesystem and tracks in database
- Real-time updates between frontend and backend through Wails event system