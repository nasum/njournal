import React from 'react'
import {createRoot} from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App'
import { Notes } from './components/pages/notes/Note';
import { Form } from './components/pages/notes/Form';
import { List } from './components/pages/notes/List';
import '@acab/reset.css';

const container = document.getElementById('root')

const router = createBrowserRouter([{
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
}])

const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />  
  </React.StrictMode>
)
