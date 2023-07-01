import React from "react";
import Navbar from "./Pages/Navbar";
import Footer from "./Pages/Footer";
import { Outlet } from "react-router-dom";

const index = () => {
  return (
    <div className="">
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default index;
