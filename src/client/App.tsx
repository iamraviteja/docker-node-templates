import React from "react";
import { Route, Routes } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";

import Dashboard from "@pages/Dashboard";

import { TooltipProvider } from "@client/shadcn/components/ui/tooltip";
import { SQLiteDBProvider } from "./hooks/useDB";

function App() {
  return (
    <>
      <SQLiteDBProvider>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Routes>
        </TooltipProvider>
      </SQLiteDBProvider>
    </>
  );
}

export default App;
