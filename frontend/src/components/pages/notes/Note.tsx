import { useAtom } from "jotai";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { BsFileRichtext } from "react-icons/bs";
import { FaRegFileAlt } from "react-icons/fa";
import { FiClipboard } from "react-icons/fi";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Link, Outlet, useParams } from "react-router-dom";
import styled from "styled-components";

import { FooterTools } from "../../../atoms/footerTools";
import { type NoteHookType, useNotes } from "../../../hooks/useNotes";
import { GetNotesOrder, SaveNotesOrder } from "../../../lib/localStorage";
import { Editor } from "../../common/editor/Editor";

const NoteTable = styled.div`
	width: 175px;
	font-size: 15px;
`;

const Item = styled.tr`
`;

const Title = styled.div`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	width: 175px;
`;

const NoteContainer = styled.div`
	display: flex;
`;

const EditorArea = styled.div`
	flex: 1 ;
`;


const NoteContext = createContext<NoteHookType | null>(null);

const OrderArrow = (order: "asc" | "desc") => {
	const Arrow = order === "asc" ? <FiChevronUp /> : <FiChevronDown />;
	return (
		<span
			style={{
				display: "inline-block",
				marginLeft: "5px",
			}}
		>
			{Arrow}
		</span>
	);
};

export const Notes = () => {
	const note = useNotes();

	if (!note) {
		return null;
	}

	return (
		<NoteContext.Provider value={note}>
			<NoteContainer>
				<List></List>
				<EditorArea>
					<Outlet />
				</EditorArea>
			</NoteContainer>
		</NoteContext.Provider>
	);
};

export const List = () => {
	const note = useContext(NoteContext);
	const [noteOrderBy, setNoteOrderBy] = useState(GetNotesOrder());

	const DateArea = ({ date }: { date: string }) => {
		const now = new Date();
		const datetime = new Date(date).toLocaleString();
		const diff = now.getTime() - new Date(date).getTime();
		if (diff < 1000 * 60 * 60) {
			return <span>{Math.floor(diff / 1000 / 60)} minutes ago</span>;
		} else if (diff < 1000 * 60 * 60 * 24) {
			return <span>{Math.floor(diff / 1000 / 60 / 60)} hours ago</span>;
		} else if (diff < 1000 * 60 * 60 * 24 * 7) {
			return <span>{Math.floor(diff / 1000 / 60 / 60 / 24)} days ago</span>;
		} else {
			return <span>{datetime}</span>;
		}
	};

	useEffect(() => {
		// fixit later
		SaveNotesOrder(noteOrderBy);
		note?.readNotes();
	}, [noteOrderBy]);

	const handleOrderBy = (targetOrderBy: "updated_at" | "created_at") => {
		if (noteOrderBy.order_by === targetOrderBy) {
			setNoteOrderBy({
				order_by: targetOrderBy,
				order: noteOrderBy.order === "asc" ? "desc" : "asc",
			});
		} else {
			setNoteOrderBy({ order_by: targetOrderBy, order: "desc" });
		}
	};

	return (
		<NoteTable>
			<div>
				<button onClick={() => handleOrderBy("updated_at")}>
					Updated {OrderArrow(noteOrderBy.order_by === "updated_at" ? noteOrderBy.order : "asc")}
				</button>
				<button onClick={() => handleOrderBy("created_at")}>
					Created {OrderArrow(noteOrderBy.order_by === "created_at" ? noteOrderBy.order : "asc")}
				</button>
			</div>
			<ul>
				{note?.notes.map((note) => (
					<li key={note.ID}>
						<Link to={`${note.ID}`}>
							<Title>{note.Title || "no title"}</Title>
						</Link>
					</li>
				))}
			</ul>
		</NoteTable>
	);
};

export const Form = () => {
	const note = useContext(NoteContext);
	const [content, setContent] = useState<string | null>(null);
	const [isRichText, setIsRichText] = useState(true);

	const [_, setFooterTools] = useAtom(FooterTools);

	const toggleEditorType = useCallback(() => {
		setIsRichText(!isRichText);
	}, [isRichText]);

	type ChangeRichTextButtonType = {
		isRichText: boolean;
	};

	const ChangeRichTextButton = useCallback(
		({ isRichText }: ChangeRichTextButtonType) => {
			return (
				<button type="button" onClick={toggleEditorType}>
					{isRichText ? <BsFileRichtext /> : <FaRegFileAlt />}
				</button>
			);
		},
		[toggleEditorType],
	);

	const CopyNotePathButton = useCallback(() => {
		return (
			<button
				type="button"
				onClick={() => {
					navigator.clipboard.writeText(window.location.pathname);
				}}
			>
				<FiClipboard />
			</button>
		);
	}, []);

	const { id } = useParams();

	useEffect(() => {
		if (id) {
			note?.getNote(id).then((n) => {
				console.log("note", n);
				if (n) {
					setContent(n.content);
				}
			});
		}
	}, [id]);

	useEffect(() => {
		setFooterTools([
			<ChangeRichTextButton
				isRichText={isRichText}
				key="changeRichTextButton"
			/>,
			<CopyNotePathButton key="copyNotePathButton" />,
		]);
	}, [isRichText, setFooterTools, ChangeRichTextButton, CopyNotePathButton]);

	const handleUpdateNote = (updatedContent: string) => {
		if (id) {
			note?.updateNote(id, updatedContent);
		}
	};

	return content !== null ? (
		<Editor
			isRitchText={isRichText}
			content={content}
			updateNote={handleUpdateNote}
		/>
	) : null;
};
