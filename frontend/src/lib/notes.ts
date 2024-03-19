import {
	CreateNote,
	GetNote,
	ListNotes,
	UpdateNote,
} from "../../wailsjs/go/main/App";
import { LogDebug } from "../../wailsjs/runtime";

export type Note = {
	ID: string;
	Content: string;
	UpdatedAt?: string;
	CreatedAt?: string;
};

export function CallCreateNote(note: Note): Promise<Note> {
	return CreateNote(note.Content);
}

export function CallGetNoteById(id: number): Promise<Note> {
	LogDebug(`CallGetNoteById: ${id}`);
	if (id) {
		return GetNote(id);
	} else {
		return Promise.reject("Invalid ID");
	}
}

export function CallUpdateNote(id: number, content: string): Promise<Note> {
	return UpdateNote(id, content);
}

export async function CallListNotes(): Promise<Note[]> {
	const notes = await ListNotes();
	return notes.map((note: any) => {
		return {
			ID: note.ID,
			Content: note.Content,
			UpdatedAt: note.UpdatedAt,
			CreatedAt: note.CreatedAt,
		};
	});
}
