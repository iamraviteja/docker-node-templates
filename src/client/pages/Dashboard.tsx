import React from "react";

import QueryOutputPanel from "@components/QueryOutputPanel";

export function Dashboard() {
  return (
    <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="relative hidden flex-col items-start gap-8 md:flex">
        <div className="grid w-full items-start gap-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit dolor architecto consectetur accusamus repudiandae placeat, eum dolore illo commodi exercitationem unde. Quos porro accusantium iure suscipit amet provident aut eligendi?
        </div>
      </div>
      <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
        <QueryOutputPanel />
      </div>
    </main>
  );
}

export default Dashboard;
