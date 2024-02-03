import React from "react"
import { useNavigate, Link, Outlet } from "react-router-dom"
import { CallCreateNote } from "../../../lib/notes"

export const Notes = () => {
  const navigate = useNavigate()

  const handleClick = (event: any) => {
    event.preventDefault()

    CallCreateNote({
      ID: "",
      Content: "",
      UpdatedAt: new Date().toISOString(),
      CreatedAt: new Date().toISOString(),
    }).then(note => {
      navigate(`/notes/${note.ID}`)
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