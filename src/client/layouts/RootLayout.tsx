import Header from "@components/common/Header";
import React from "react";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        {/* <Header /> */}
        <Outlet />
      </div>
    </>
  );
}

export default RootLayout;
