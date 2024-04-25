import Header from "@components/common/Header";
import Sidebar from "@components/common/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <div className="grid h-screen w-full pl-[56px]">
          <Sidebar />
          <div className="flex flex-col">
            <Header />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default RootLayout;
