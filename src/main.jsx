import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Error from "./Error";
import Contact from "./contact";
import { getContactLoader, getloader } from "./Loader";
import {
	createContactAction,
	deleteContactAction,
	editContactAction,
} from "./ContactsAction";
import EditContact from "./editContact";
import Index from "./Index";

const Router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <Error />,
		loader: getloader,
		action: createContactAction,
		children: [
			{ index: true, element: <Index /> },
			{
				path: "/contacts/:contactId",
				element: <Contact />,
				loader: getContactLoader,
			},
			{
				path: "/contacts/:contactId/edit",
				element: <EditContact />,
				loader: getContactLoader,
				action: editContactAction,
			},
			{
				path: "/contacts/:contactId/destroy",
				action: deleteContactAction,
				errorElement: <div>Error occuerd</div>,
			},
		],
	},
]);
createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={Router} />
	</StrictMode>
);
