import React from "react";
import Home from "./components/Pages/Home";
import router from "./Router";
import { Router, RouterProvider } from "react-router-dom";
import "../src/index.css";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
