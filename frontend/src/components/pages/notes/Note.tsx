import { Link, Outlet } from "react-router-dom"

export const Notes = () => {
  return (
    <div id="Notes">
      <h1>Notes</h1>
      <Link to="new">New</Link>
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}