import { useEffect, useState, createContext, useContext } from "react"
import { useNavigate, useParams, Link, Outlet } from "react-router-dom"
import styled from "styled-components"

import { useNotes, NoteHookType } from "../../../hooks/useNotes"

const NoteContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

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
    <NoteContainer id="Notes">
      <h1>Notes</h1>
      <Link to="#" onClick={handleClick}>New</Link>
      <div style={{flex:1}} className="content">
        <NoteContext.Provider value={note}>
          <Outlet />
        </NoteContext.Provider>
      </div>
    </NoteContainer>
  )
}

export const List = () => {
  const note = useContext(NoteContext)

  const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
  `

  useEffect(() => {
    note?.readNotes()
  }, [])

  return (
    <ul>
      {note?.notes.map(note => (
        <li key={note.ID}>
          <ListItem>
            <Link to={`${note.ID}`}>{note.ID}: {note.Content}</Link> 
            <span>{note.UpdatedAt}</span>
          </ListItem>
        </li>
      ))}
    </ul>
  )
}

type EditorProps = {
  content: string
  updateNote: (content: string) => void
}

const Editor = ({content, updateNote}: EditorProps) => {
  const [value, setValue] = useState(content)

  useEffect(() => {
    setValue(content);
  }, [content]);

  const handleChange = (event: any) => {
    setValue(event.target.value)
    updateNote(event.target.value)
  }

  return (
    <textarea style={{width: "100%", height: "100%", resize: "none"}} value={value} onChange={handleChange} />
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

  const handleUpdateNote = (content: string) => {
    note?.updateNote(Number(id), content)
  }

  return (
    <Editor content={content} updateNote={handleUpdateNote} />
  )
}