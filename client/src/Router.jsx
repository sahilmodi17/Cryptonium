import { Router } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Pages/Home";

import Main from "./components";
import SingleCoin from "./components/Pages/SingleCoin";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Blog from "./components/Pages/Other/Blog";
import About from "./components/Pages/Other/About";
import Contact from "./components/Pages/Other/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/coins/:id",
        element: <SingleCoin />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
