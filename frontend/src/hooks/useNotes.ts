import { useState } from "react"
import { Note, CallListNotes, CallCreateNote, CallUpdateNote, CallGetNoteById } from "../lib/notes"

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const readNotes = async () => {
    try {
      setLoading(true)
      const notes = await CallListNotes()
      setNotes(notes)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const getNote = async (id: number) => {
    try {
      setLoading(true)
      const note = await CallGetNoteById(id)
      return note
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const createNote = async (content: string = ""): Promise<Note | null> => {
    try {
      setLoading(true)
      const note = await CallCreateNote({ 
        ID: "",
        Content: content 
      })
      await readNotes()
      return note
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }

    return null
  }

  const updateNote = async (id: number, content: string) => {
    try {
      setLoading(true)
      await CallUpdateNote(id, content)
      await readNotes()
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return {
    notes,
    loading,
    readNotes,
    createNote,
    updateNote,
    getNote
  }
}