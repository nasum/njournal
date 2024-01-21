import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CallCreateNote } from "../../../lib/notes"

export const Form = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const navigate = useNavigate()

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(title, content)
    await CallCreateNote({
      title: title,
      content: content,
    })
    navigate("/notes")
  }

  return (
    <div id="Form">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" onChange={handleChangeTitle} />
        <textarea placeholder="Content" onChange={handleChangeContent} />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}