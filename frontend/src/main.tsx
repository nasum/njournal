import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "@acab/reset.css";
import App from "./App";
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
						path: "",
						element: <List />,
					},
					{
						path: ":id",
						element: <Form />,
					},
				],
			},
		],
	},
]);

const root = createRoot(container!);

root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
