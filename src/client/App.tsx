import React from "react";
import { Route, Routes } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";

import Dashboard from "@pages/Dashboard";

import { TooltipProvider } from "@client/shadcn/components/ui/tooltip";
import { SQLiteDBProvider } from "./hooks/useDB";
import { CSVParserProvider } from "./hooks/useCSV";

function App() {
  return (
    <>
      <CSVParserProvider>
        <SQLiteDBProvider>
          <TooltipProvider>
            <Routes>
              <Route path="/" element={<RootLayout />}>
                <Route index element={<Dashboard />} />
              </Route>
            </Routes>
          </TooltipProvider>
        </SQLiteDBProvider>
      </CSVParserProvider>
    </>
  );
}

export default App;
