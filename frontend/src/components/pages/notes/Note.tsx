import { createContext, useContext, useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import styled from "styled-components";

import { NoteHookType, useNotes } from "../../../hooks/useNotes";
import { Editor } from "../../common/editor/Editor";

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

const NoteContext = createContext<NoteHookType | null>(null);

export const Notes = () => {
	const note = useNotes();

	if (!note) {
		return null;
	}

	return (
		<NoteContext.Provider value={note}>
			<Outlet />
		</NoteContext.Provider>
	);
};

export const List = () => {
	const note = useContext(NoteContext);

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
						<Title>{note.Title || "no title"}</Title>
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
		if (id) {
			note?.getNote(id).then((n) => {
				if (n) {
					setContent(n.Content);
				}
			});
		}
	}, [id]);

	const handleUpdateNote = (updatedContent: string) => {
		if (id) {
			note?.updateNote(id, updatedContent);
		}
	};

	return content !== null ? (
		<Editor content={content} updateNote={handleUpdateNote} />
	) : null;
};
