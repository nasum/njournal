import {CreateNote} from "../../wailsjs/go/main/App"

type Note = {
  title: string
  content: string
}

export async function CallCreateNote(note: Note) {
  await CreateNote(note.title, note.content)
}