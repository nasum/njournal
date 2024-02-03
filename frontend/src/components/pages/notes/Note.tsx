import React from "react"
import { useNavigate, Link, Outlet } from "react-router-dom"
import { useNotes } from "../../../hooks/useNotes"

export const Notes = () => {
  const navigate = useNavigate()

  const {createNote} = useNotes()


  const handleClick = (event: any) => {
    event.preventDefault()

    createNote().then(note => {
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
        <Outlet />
      </div>
    </div>
  )
}