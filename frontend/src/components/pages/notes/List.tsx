import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { CallListNotes, Note } from '../../../lib/notes'

export const List = () => {
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    CallListNotes().then(data => setNotes(data))
  }, [])

  return (
    <ul>
      {notes.map(note => (
        <li key={note.ID}><Link to={`${note.ID}`}>{note.ID}: {note.Content}</Link></li>
      ))}
    </ul>
  )
}