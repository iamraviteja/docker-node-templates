import React, { useState, useEffect } from "react";
import { CornerDownLeft } from "lucide-react";

import { Badge } from "@client/shadcn/components/ui/badge";
import { Label } from "@client/shadcn/components/ui/label";
import { Button } from "@client/shadcn/components/ui/button";
import { Textarea } from "@client/shadcn/components/ui/textarea";

import { useDB } from "@client/hooks/useDB";

function QueryOutputPanel() {
  const [queryContent, setQueryContent] = useState('');
  const { state, execQuery} = useDB();
  useEffect(() => {
    console.log('OUTPUT :: ',state);
  }, [state])
  const handleQueryClick = () => {
    execQuery(queryContent);
  }
  return (
    <>
      <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
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
            onChange={e => setQueryContent(e.target.value)}
          />
          <div className="flex items-center p-3 pt-0">
            <Button onClick={handleQueryClick} size="sm" className="ml-auto gap-1.5">
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
      </div>
    </>
  );
}

export default QueryOutputPanel;
