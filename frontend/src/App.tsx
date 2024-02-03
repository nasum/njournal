import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { SideBar } from './components/common/SideBar';

const AppContainer = styled.div`
  display: flex;
  height: 100%;
`

const MainContainer = styled.main`
  width: 100%;
  height: 100%;
  padding: 10px;
`


function App() {
  return (
    <AppContainer id="App">
      <SideBar />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </AppContainer>
  )
}

export default App
