import React, { useState, useEffect } from "react";
import { CornerDownLeft } from "lucide-react";

import { Badge } from "@client/shadcn/components/ui/badge";
import { Label } from "@client/shadcn/components/ui/label";
import { Button } from "@client/shadcn/components/ui/button";
import { Textarea } from "@client/shadcn/components/ui/textarea";

import { useDB } from "@client/hooks/useDB";

function QueryOutputPanel() {
  const [queryContent, setQueryContent] = useState("");
  const { state, execQuery } = useDB();
  useEffect(() => {
    console.log("OUTPUT :: ", state);
    if (state.db) {
      try {
        let res = state.db.exec(
          "DROP TABLE IF EXISTS test;\n" +
            "CREATE TABLE test (id INTEGER, age INTEGER, name TEXT);" +
            "INSERT INTO test VALUES ($id1, :age1, @name1);" +
            "INSERT INTO test VALUES ($id2, :age2, @name2);" +
            "SELECT id FROM test;" +
            "SELECT age,name FROM test WHERE id=$id1",
          {
            $id1: 1,
            ":age1": 1,
            "@name1": "Ling",
            $id2: 2,
            ":age2": 18,
            "@name2": "Paul",
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  }, [state]);
  const handleQueryClick = () => {
    let res = null;
    if (state.db) {
      res = state.db.exec(queryContent);
    }
    console.log(res);
    // execQuery(queryContent);
  };
  return (
    <>
      <div
        className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
        x-chunk="dashboard-03-chunk-1"
      >
        <Label htmlFor="query" className="sr-only">
          Query
        </Label>
        <Textarea
          id="query"
          placeholder="Type your query here..."
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
          value={queryContent}
          onChange={(e) => setQueryContent(e.target.value)}
        />
        <div className="flex items-center p-3 pt-0">
          <Button
            onClick={handleQueryClick}
            size="sm"
            className="ml-auto gap-1.5"
          >
            Execute Query
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </div>
      <div className="relative flex-1">
        <Badge variant="outline" className="absolute right-3 top-3">
          Output
        </Badge>
      </div>
    </>
  );
}

export default QueryOutputPanel;
