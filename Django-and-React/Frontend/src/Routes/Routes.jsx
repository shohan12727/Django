import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Root from "../Root/Root";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Form from "../components/Form";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "login",
    Component: Login,
  },
  {
    path: "register",
    Component: Register,
  },
  {
    path: "not_found",
    Component: NotFound,
  },
  {
    path: "form",
    Component: Form,
  },
]);
