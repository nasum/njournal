import { createContext, useContext, useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import styled from "styled-components";

import { NoteHookType, useNotes } from "../../../hooks/useNotes";
import { Editor } from "../../common/editor/Editor";

const NoteContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const NoteContext = createContext<NoteHookType | null>(null);

export const Notes = () => {
	const note = useNotes();

	if (!note) {
		return null;
	}

	return (
		<NoteContainer id="Notes">
			<div style={{ flex: 1 }} className="content">
				<NoteContext.Provider value={note}>
					<Outlet />
				</NoteContext.Provider>
			</div>
		</NoteContainer>
	);
};

export const List = () => {
	const note = useContext(NoteContext);

	const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
  `;

	const Title = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 500px;
  `;

	const DateArea = ({ date }: { date: string }) => {
		const datetime = new Date(date).toLocaleString();
		return <span>{datetime}</span>;
	};

	useEffect(() => {
		note?.readNotes();
	}, []);

	return (
		<ul>
			{note?.notes.map((note) => (
				<ListItem key={note.ID}>
					<Link to={`${note.ID}`}>
						<Title>{note.Content || "no contents"}</Title>
					</Link>
					<DateArea date={note.UpdatedAt || ""} />
				</ListItem>
			))}
		</ul>
	);
};

export const Form = () => {
	const note = useContext(NoteContext);
	const [content, setContent] = useState<string | null>(null);

	const { id } = useParams();

	useEffect(() => {
		if (Number(id) != 0) {
			note?.getNote(Number(id)).then((n) => {
				if (n) {
					setContent(n.Content);
				}
			});
		}
	}, [id]);

	const handleUpdateNote = (updatedContent: string) => {
		note?.updateNote(Number(id), updatedContent);
	};

	return content !== null ? (
		<Editor content={content} updateNote={handleUpdateNote} />
	) : null;
};
