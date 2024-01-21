import {useState, useEffect} from 'react'
import { CallListNotes } from '../../../lib/notes'

type Note = {
  id: string
  title: string
  content: string
  updatedAt: string
  createdAt: string
}

export const List = () => {
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    CallListNotes().then(setNotes)
  }, [])

  return (
    <ul>
      {notes.map(note => (
        <li key={note.id}>{note.title}</li>
      ))}
    </ul>
  )
}