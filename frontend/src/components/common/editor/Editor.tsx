import { useState } from "react";
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

const EditorContainer = styled.div`
  :where(ul) {
    list-style: disc;
  }
  :where(ol) {
    list-style: decimal;
  }
`;

type EditorProps = {
	content: string;
	updateNote: (content: string) => void;
};

const ExtendedTransformer = [CHECK_LIST, ...TRANSFORMERS, CODE];

export const Editor = ({ content, updateNote }: EditorProps) => {
	const [value, setValue] = useState(content);
	const Placeholder = () => {
		return (
			<div className="editor-placeholder">
				Play around with the Markdown plugin...
			</div>
		);
	};

	const handleEditorChange = (editor: EditorState) => {
		editor.read(() => {
			const markdown = $convertToMarkdownString(ExtendedTransformer);
			setValue(markdown);
			updateNote(markdown);
		});
	};

	const editorConfig = {
		namespace: "editor",
		editorState: () => {
			$convertFromMarkdownString(content, ExtendedTransformer);
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

	return (
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
			</EditorContainer>
		</LexicalComposer>
	);
};
