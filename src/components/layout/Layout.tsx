import React, { FC } from "react";
import AppHeader from "../app-header/AppHeader";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
};

export default Layout;
