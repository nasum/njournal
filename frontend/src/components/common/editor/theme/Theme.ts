import type { EditorThemeClasses } from "lexical";

import "./CheckboxStyle.css";

export const Theme: EditorThemeClasses = {
	container: "EditorTheme__container",
	list: {
		listitem: "EditorTheme__listItem",
		listitemChecked: "EditorTheme__listItemChecked",
		listitemUnchecked: "EditorTheme__listItemUnchecked",
	},
};
