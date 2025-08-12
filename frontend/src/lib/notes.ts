import {
	CreateNote,
	GetNote,
	ListNotes,
	UpdateNote,
} from "../../wailsjs/go/main/App";
import type { main } from "../../wailsjs/go/models";
import { LogDebug } from "../../wailsjs/runtime";

export type Note = {
	ID: string;
	Title?: string;
	Content: string;
	UpdatedAt?: string;
	CreatedAt?: string;
};

export function CallCreateNote(note: Note): Promise<main.Note> {
	return CreateNote(note.Content);
}

export function CallGetNoteById(id: string): Promise<main.Note> {
	LogDebug(`CallGetNoteById: ${id}`);
	if (id) {
		return GetNote(id);
	}

	return Promise.reject("Invalid ID");
}

export function CallUpdateNote(
	id: string,
	content: string,
): Promise<main.Note> {
	return UpdateNote(id, content);
}

type ListNotesOptions = {
	OrderBy?: "updated_at" | "created_at";
	Order?: "asc" | "desc";
};

export async function CallListNotes(
	option: main.ListNotesOptions,
): Promise<Note[]> {
	LogDebug("CallListNotes");
	const notes = await ListNotes(option);
	return notes.map((note) => {
		return {
			ID: String(note.id),
			Title: note.title,
			Content: note.content,
			UpdatedAt: note.updatedAt,
			CreatedAt: note.createdAt,
		};
	});
}
