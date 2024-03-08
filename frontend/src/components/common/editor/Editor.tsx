import { useState, useEffect } from "react";
import styled from "styled-components";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlight";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { EditorState } from "lexical";
import {
	$convertFromMarkdownString,
	$convertToMarkdownString,
	CHECK_LIST,
	CODE,
	TRANSFORMERS,
} from "@lexical/markdown";
import { Theme } from "./theme/Theme";

import "github-markdown-css";

const PlainTextEditor = styled.textarea`
	width: 100%;
	height: 100%;
	&:focus {
		outline: none;
	}
`;

const EditorContainer = styled.div`
	position: relative;
  :where(ul) {
    list-style: disc;
  }
  :where(ol) {
    list-style: decimal;
  }
`;

const EditorActions = styled.div`
	display: flex;
	justify-content: space-between;
`;

const EditorActionsButton = styled.button`
	padding: 10px;
	border: 1px solid #000;
	border-radius: 5px;
`;

const PlaceholderContent = styled.div`
	position: absolute;
	padding: 10px;
	top: 20px;
	pointer-events: none;
`;

type EditorProps = {
	content: string;
	updateNote: (content: string) => void;
};

const ExtendedTransformer = [CHECK_LIST, ...TRANSFORMERS, CODE];

export const Editor = ({ content, updateNote }: EditorProps) => {
	const [value, setValue] = useState(content);
	const [isRitchText, setIsRitchText] = useState(true);
	const Placeholder = () => {
		return (
			<PlaceholderContent className="editor-placeholder">
				Please type your note here...
			</PlaceholderContent>
		);
	};

	useEffect(() => {
		updateNote(value);
	}, [value]);

	const handleEditorChange = (editor: EditorState) => {
		editor.read(() => {
			const markdown = $convertToMarkdownString(ExtendedTransformer);
			setValue(markdown);
		});
	};

	const handlePlainEditorChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		setValue(event.target.value);
	};

	const editorConfig = {
		namespace: "editor",
		editorState: () => {
			$convertFromMarkdownString(value || content, ExtendedTransformer);
		},
		nodes: [
			HeadingNode,
			ListNode,
			ListItemNode,
			QuoteNode,
			CodeNode,
			CodeHighlightNode,
			TableNode,
			TableCellNode,
			TableRowNode,
			AutoLinkNode,
			LinkNode,
		],
		onError: (err: any) => {
			console.error(err);
		},
		theme: Theme,
	};

	const handleChangeEditorType = () => {
		setIsRitchText(!isRitchText);
	};

	return (
		<>
			<EditorActions>
				<EditorActionsButton onClick={handleChangeEditorType}>
					Change to {isRitchText ? "plain" : "ritch"} text editor
				</EditorActionsButton>
			</EditorActions>
			{isRitchText ? (
				<LexicalComposer initialConfig={editorConfig}>
					<EditorContainer className="editor-container markdown-body">
						<RichTextPlugin
							contentEditable={<ContentEditable className="editor-input" />}
							placeholder={<Placeholder />}
							ErrorBoundary={LexicalErrorBoundary}
						/>
						<AutoFocusPlugin />
						<ListPlugin />
						<CheckListPlugin />
						<LinkPlugin />
						<HistoryPlugin />
						<MarkdownShortcutPlugin transformers={ExtendedTransformer} />
						<OnChangePlugin onChange={handleEditorChange} />
						<CodeHighlightPlugin />
						<TabIndentationPlugin />
					</EditorContainer>
				</LexicalComposer>
			) : (
				<PlainTextEditor value={value} onChange={handlePlainEditorChange} />
			)}
		</>
	);
};
