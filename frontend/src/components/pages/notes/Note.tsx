import { useEffect, useState, createContext, useContext } from "react"
import { useNavigate, Link, Outlet } from "react-router-dom"
import { useNotes, NoteHookType } from "../../../hooks/useNotes"

const NoteContext = createContext<NoteHookType | null>(null)

export const Notes = () => {
  const navigate = useNavigate()
  const note = useNotes();

  if (!note) {
    return null;
  }

  const handleClick = (event: any) => {
    event.preventDefault()

    note.createNote("").then(note => {
      if (note) {
        navigate(`/notes/${note.ID}`)
      }
    })
  }

  return (
    <div id="Notes">
      <h1>Notes</h1>
      <Link to="#" onClick={handleClick}>New</Link>
      <div className="content">
        <NoteContext.Provider value={note}>
          <Outlet />
        </NoteContext.Provider>
      </div>
    </div>
  )
}

export const List = () => {

  const note = useContext(NoteContext)

  useEffect(() => {
    note?.readNotes()
  }, [note])

  return (
    <ul>
      {note?.notes.map(note => (
        <li key={note.ID}><Link to={`${note.ID}`}>{note.ID}: {note.Content}</Link></li>
      ))}
    </ul>
  )
}