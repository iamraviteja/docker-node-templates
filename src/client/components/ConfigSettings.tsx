import React, { useState } from "react";
import { Rabbit } from "lucide-react";

import { Label } from "@client/shadcn/components/ui/label";
import { Input } from "@client/shadcn/components/ui/input";
import { Button } from "@client/shadcn/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@client/shadcn/components/ui/select";
import {useCSV} from "@client/hooks/useCSV";

function ConfigSettings() {
  const {setFile, state} = useCSV();

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  const processCSV = () => {
    console.log(state.results);
  };

  return (
    <>
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
        <div className="grid gap-3">
          <Label htmlFor="model">Database</Label>
          <Select>
            <SelectTrigger
              id="model"
              className="items-start [&_[data-description]]:hidden"
            >
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="genesis">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Rabbit className="size-5" />
                  <div className="grid gap-0.5">
                    <p>
                      <span className="font-medium text-foreground">
                        SQLite
                      </span>
                    </p>
                    <p className="text-xs" data-description>
                      SQL Database in browser powered by wasm.
                    </p>
                  </div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="csvfile">Load CSV file</Label>
          <Input id="csvfile" type="file" onChange={handleFileInputChange} />
          <Button onClick={processCSV}>Process</Button>
        </div>
      </fieldset>
    </>
  );
}

export default ConfigSettings;
