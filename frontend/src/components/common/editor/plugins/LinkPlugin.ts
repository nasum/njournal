import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isLinkNode } from "@lexical/link";
import type { LexicalEditor } from "lexical";
import { $getNearestNodeFromDOMNode } from "lexical";
import { BrowserOpenURL } from "../../../../../wailsjs/runtime";

export default function LinkPlugin() {
	const [editor] = useLexicalComposerContext();

	useEffect(() => {
		const onClick = (e: MouseEvent) => {
			const linkDomNode = getLinkDomNode(e, editor);

			if (linkDomNode === null) {
				return;
			}

			const href = linkDomNode.getAttribute("href");

			let linkNode = null;
			editor.update(() => {
				const maybeLinkNode = $getNearestNodeFromDOMNode(linkDomNode);

				if ($isLinkNode(maybeLinkNode)) {
					linkNode = maybeLinkNode;
				}
			});

			try {
				if (href !== null) {
					BrowserOpenURL(href);
					e.preventDefault();
				}
			} catch (e) {
				console.error(e);
			}
		};

		return editor.registerRootListener(
			(
				rootElement: null | HTMLElement,
				prevRootElement: null | HTMLElement,
			) => {
				if (prevRootElement !== null) {
					prevRootElement.removeEventListener("click", onClick);
					prevRootElement.removeEventListener("auxclick", onClick);
				}

				if (rootElement !== null) {
					rootElement.addEventListener("click", onClick);
					rootElement.addEventListener("auxclick", onClick);
				}
			},
		);
	}, [editor]);

	return null;
}

function isLinkDomNode(domNode: Node): boolean {
	return domNode.nodeName.toLowerCase() === "a";
}

function getLinkDomNode(
	event: MouseEvent | PointerEvent,
	editor: LexicalEditor,
): HTMLAnchorElement | null {
	return editor.getEditorState().read(() => {
		const domNode = event.target as Node;

		if (isLinkDomNode(domNode)) {
			return domNode as HTMLAnchorElement;
		}

		if (domNode.parentNode && isLinkDomNode(domNode.parentNode)) {
			return domNode.parentNode as HTMLAnchorElement;
		}

		return null;
	});
}
