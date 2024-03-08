/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * https://github.com/facebook/lexical/blob/4eb91a8c20d8c79c569c27bdebecbe5341fa91ce/packages/lexical-playground/src/plugins/CodeHighlightPlugin/index.ts
 */

import { registerCodeHighlighting } from "@lexical/code";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

export default function CodeHighlightPlugin(): JSX.Element | null {
	const [editor] = useLexicalComposerContext();

	useEffect(() => {
		return registerCodeHighlighting(editor);
	}, [editor]);

	return null;
}
