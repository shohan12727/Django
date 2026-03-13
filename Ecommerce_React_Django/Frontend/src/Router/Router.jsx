import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import ErrorPage from "../pages/ErrorPage";


export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage/>,
    Component: Root,
    // children: [
     
    // ],
  },
]);