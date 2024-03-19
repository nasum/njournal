import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { SideBar } from "./components/common/SideBar";
import { ActionButton } from "./components/common/ActionButton";

import { useNotes } from "./hooks/useNotes";

const AppContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const MainContainer = styled.main`
  min-width: 700px;
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow-y: scroll;
`;

function App() {
	const navigate = useNavigate();
	const note = useNotes();

	if (!note) {
		return null;
	}

	const craeteNote = () => {
		note.createNote("").then((note) => {
			if (note) {
				navigate(`/notes/${note.ID}`);
			}
		});
	};

	return (
		<AppContainer id="App">
			<SideBar />
			<MainContainer>
				<Outlet />
			</MainContainer>
			<ActionButton createNote={craeteNote} />
		</AppContainer>
	);
}

export default App;
