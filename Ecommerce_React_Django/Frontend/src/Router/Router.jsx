import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
]);
