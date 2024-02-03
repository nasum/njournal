import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CallGetNoteById, CallUpdateNote } from "../../../lib/notes"


export const Form = () => {
  const [content, setContent] = useState("")

  const { id } = useParams()

  useEffect(() => {
    if (Number(id) != 0){
      CallGetNoteById(Number(id)).then(note => {
        setContent(note.Content)
      })
    } 
  }, [id])

  const handleChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
    CallUpdateNote(Number(id), event.target.value)
  }

  return (
    <div id="Form">
      <form>
        <textarea placeholder="Content" onChange={handleChangeContent} value={content} />
      </form>
    </div>
  )
}