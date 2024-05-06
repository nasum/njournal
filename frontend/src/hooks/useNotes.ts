import { useState } from "react";
import { GetNotesOrder } from "../lib/localStorage";
import {
	CallCreateNote,
	CallGetNoteById,
	CallListNotes,
	CallUpdateNote,
	Note,
} from "../lib/notes";

export type NoteHookType = {
	notes: Note[];
	loading: boolean;
	readNotes: () => void;
	createNote: (content: string) => Promise<Note | null>;
	updateNote: (id: string, content: string) => void;
	getNote: (id: string) => Promise<Note | null>;
};

export const useNotes = (): NoteHookType => {
	const [notes, setNotes] = useState<Note[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const readNotes = async () => {
		try {
			setLoading(true);
			const order = GetNotesOrder();
			const notes = await CallListNotes({
				OrderBy: order.order_by,
				Order: order.order,
			});
			setNotes(notes);
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	};

	const getNote = async (id: string) => {
		try {
			setLoading(true);
			const note = await CallGetNoteById(id);
			return note;
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}

		return null;
	};

	const createNote = async (content = ""): Promise<Note | null> => {
		try {
			setLoading(true);
			const note = await CallCreateNote({
				ID: crypto.randomUUID(),
				Content: content,
			});
			await readNotes();
			return note;
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}

		return null;
	};

	const updateNote = async (id: string, content: string) => {
		try {
			setLoading(true);

			const targetNote = notes.find((note) => note.ID === String(id));

			if (targetNote?.Content !== content) {
				await CallUpdateNote(id, content);
				await readNotes();
			}
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	};

	return {
		notes,
		loading,
		readNotes,
		createNote,
		updateNote,
		getNote,
	};
};
