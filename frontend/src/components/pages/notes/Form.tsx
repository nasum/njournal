import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CallCreateNote } from "../../../lib/notes"

export const Form = () => {
  const [content, setContent] = useState("")
  const navigate = useNavigate()

  const handleChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await CallCreateNote({
      id: "",
      content: content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    navigate("/notes")
  }

  return (
    <div id="Form">
      <form onSubmit={handleSubmit}>
        <textarea placeholder="Content" onChange={handleChangeContent} />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}