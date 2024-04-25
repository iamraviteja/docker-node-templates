import React from "react";
import { Route, Routes } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";

import Dashboard from "@pages/Dashboard";

import { TooltipProvider } from "@client/shadcn/components/ui/tooltip";
import { SQLiteDBProvider } from "./hooks/useDB";
import { CSVParserProvider } from "./hooks/useCSV";
import DBSettings from "@pages/DBSettings";
import { DBTableListProvider } from "./hooks/useDBTableList";

function App() {
  return (
    <>
      <CSVParserProvider>
        <SQLiteDBProvider>
          <DBTableListProvider>
            <TooltipProvider>
              <Routes>
                <Route path="/" element={<RootLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="/settings" element={<DBSettings />} />
                </Route>
              </Routes>
            </TooltipProvider>
          </DBTableListProvider>
        </SQLiteDBProvider>
      </CSVParserProvider>
    </>
  );
}

export default App;
