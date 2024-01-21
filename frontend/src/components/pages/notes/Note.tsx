import { Outlet } from "react-router-dom"

export const Notes = () => {
  return (
    <div id="Notes">
      <h1>Notes</h1>
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}