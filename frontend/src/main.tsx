import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "@acab/reset.css";
import App from "./App";
import { ImageList, Images } from "./components/pages/images/Image";
import { Form, List, Notes } from "./components/pages/notes/Note";

const container = document.getElementById("root");

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "",
				element: <h1>Home</h1>,
			},
			{
				path: "/notes",
				element: <Notes />,
				children: [
					{
						path: ":id",
						element: <Form />,
					},
				],
			},
			{
				path: "/images",
				element: <Images />,
				children: [
					{
						path: "",
						element: <ImageList />,
					},
				],
			},
			{
				path: "/settings",
				element: <h1>Settings</h1>,
			}
		],
	},
]);

if (!container) {
	throw new Error("No root element found");
}

const root = createRoot(container ? container : document.createElement("div"));

root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
