import { Outlet } from 'react-router-dom';
import { AppHeader } from './components/common/AppHeader';

function App() {
  return (
    <div id="App">
      <AppHeader />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
