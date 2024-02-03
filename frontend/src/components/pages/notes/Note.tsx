import { useEffect, useState, createContext, useContext } from "react"
import { useNavigate, useParams, Link, Outlet } from "react-router-dom"
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
        <li key={note.ID}>
          <Link to={`${note.ID}`}>{note.ID}: {note.Content}</Link> 
          <span>{note.UpdatedAt}</span>
        </li>
      ))}
    </ul>
  )
}


export const Form = () => {
  const note = useContext(NoteContext)
  const [content, setContent] = useState("")

  const { id } = useParams()

  useEffect(() => {
    if (Number(id) != 0){
      note?.getNote(Number(id)).then(n => {
        if (n) {
          setContent(n.Content)
        }
      })
    } 
  }, [id])

  const handleChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
    note?.updateNote(Number(id), event.target.value)
  }

  return (
    <div id="Form">
      <form>
        <textarea placeholder="Content" onChange={handleChangeContent} value={content} />
      </form>
    </div>
  )
}