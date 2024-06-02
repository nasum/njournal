import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAtom, createStore, Provider } from "jotai";

import { ActionButton } from "./components/common/ActionButton";
import { SideBar } from "./components/common/SideBar";
import { FooterBar } from "./components/common/FooterBar";

import { useNotes } from "./hooks/useNotes";
import { FooterTools } from "./atoms/footerTools";

const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
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

const AppInner = styled.div`
	display: flex;
	width: 100%;
	height: calc(100% - 25px);
`;

function App() {
	const store = createStore();
	store.set(FooterTools, []);

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
			<Provider store={store}>
				<AppInner>
					<SideBar />
					<MainContainer>
						<Outlet />
					</MainContainer>
					<ActionButton createNote={craeteNote} />
				</AppInner>
				<FooterBar />
			</Provider>
		</AppContainer>
	);
}

export default App;
