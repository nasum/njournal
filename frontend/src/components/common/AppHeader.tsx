import { Link } from 'react-router-dom'

export const AppHeader = () => {
  return (
    <div id="AppHeader">
      <Link to="/">Home</Link>
      <Link to="/notes/new">New Notes</Link>
    </div>
  )
}