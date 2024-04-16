import React from "react";

import Sidebar from "@components/common/Sidebar";
import Header from "@components/common/Header";
import ConfigSettings from "@components/ConfigSettings";
import SchemaSettings from "@components/SchemaSettings";
import QueryOutputPanel from "@components/QueryOutputPanel";

export function Dashboard() {
  
  return (
    <div className="grid h-screen w-full pl-[56px]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            className="relative hidden flex-col items-start gap-8 md:flex"
            x-chunk="dashboard-03-chunk-0"
          >
            <div className="grid w-full items-start gap-6">
              <ConfigSettings />
              <SchemaSettings />
            </div>
          </div>
          <QueryOutputPanel />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
