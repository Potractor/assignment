import React from "react";
import SideBar from "./components/SideBar";
import { Outlet } from "react-router-dom";
const Layout = () => {
  // if (
  //   !localStorage.getItem("accessToken") ||
  //   !(
  //     localStorage.getItem("expiration") &&
  //     localStorage.getItem("expiration") > Date.now()
  //   )
  // ) {
  //   console.log("true");
  //   window.location.href = "/login";
  //   return;
  // }
  return (
    <div className="app">
      <div className="title">Product Dashboard</div>
      <div className="main-body">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
