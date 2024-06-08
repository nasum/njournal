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

const NoteTable = styled.table`
	width: 100%;
`;

const Item = styled.tr`
`;

const Title = styled.div`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	width: 500px;
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
			<Outlet />
		</NoteContext.Provider>
	);
};

export const List = () => {
	const note = useContext(NoteContext);
	const [noteOrderBy, setNoteOrderBy] = useState(GetNotesOrder());

	const DateArea = ({ date }: { date: string }) => {
		const datetime = new Date(date).toLocaleString();
		return <span>{datetime}</span>;
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
			<thead>
				<tr>
					<th>Title</th>
					<th
						style={{
							cursor: "pointer",
							textDecoration:
								noteOrderBy.order_by === "updated_at" ? "underline" : "none",
						}}
						onClick={() => handleOrderBy("updated_at")}
						onKeyDown={() => handleOrderBy("updated_at")}
					>
						{noteOrderBy.order_by === "updated_at"
							? OrderArrow(noteOrderBy.order)
							: null}
						Updated At
					</th>
					<th
						style={{
							cursor: "pointer",
							textDecoration:
								noteOrderBy.order_by === "created_at" ? "underline" : "none",
						}}
						onClick={() => handleOrderBy("created_at")}
						onKeyDown={() => handleOrderBy("created_at")}
					>
						{noteOrderBy.order_by === "created_at"
							? OrderArrow(noteOrderBy.order)
							: null}
						Created At
					</th>
				</tr>
			</thead>
			<tbody>
				{note?.notes.map((note) => (
					<Item key={note.ID}>
						<td>
							<Link to={`${note.ID}`}>
								<Title>{note.Title || "no title"}</Title>
							</Link>
						</td>
						<td>
							<DateArea date={note.UpdatedAt || ""} />
						</td>
						<td>
							<DateArea date={note.CreatedAt || ""} />
						</td>
					</Item>
				))}
			</tbody>
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
				if (n) {
					setContent(n.Content);
				}
			});
		}
	}, []);

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
