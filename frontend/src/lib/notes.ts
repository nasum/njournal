import {CreateNote, ListNotes} from "../../wailsjs/go/main/App"

type Note = {
  id: string
  content: string
  updatedAt: string
  createdAt: string
}

export async function CallCreateNote(note: Note) {
  await CreateNote(note.content)
}

export async function CallListNotes(): Promise<Note[]> {
  const notes = await ListNotes()
  return notes.map((note: any) => {
    return {
      id: note.ID,
      content: note.Content,
      updatedAt: note.UpdatedAt,
      createdAt: note.CreatedAt,
    }
  })
}