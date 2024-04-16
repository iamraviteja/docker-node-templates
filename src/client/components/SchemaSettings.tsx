import React, { useEffect, useState } from "react";

import { Label } from "@client/shadcn/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@client/shadcn/components/ui/select";
import { Button } from "@client/shadcn/components/ui/button";

import { useCSV } from "@client/hooks/useCSV";
import { DATA_TYPES, createTable } from "@client/lib/queryBuilder";
import { useDB } from "@client/hooks/useDB";

function SchemaSettings() {
  const { state: dbState } = useDB();
  const { state } = useCSV();
  const [fields, setFields] = useState([]);

  useEffect(() => {
    console.log("Schema Settings", state.results);
    if (state.results?.meta?.fields) {
      setFields(
        state.results?.meta?.fields.map((f) => ({
          colName: f,
          colType: DATA_TYPES[0],
        }))
      );
    } else {
      setFields([]);
    }
  }, [state]);

  const handleCreateTable = () => {
    createTable(dbState.db, 'customer_churn' ,state.results.data, fields);
  };

  const handleTypeSelect = (colName: string, type: string) => {
    let nFeilds = [...fields];
    nFeilds.forEach((f: any) => {
      if (f.colName === colName) {
        f.colType = type;
      }
    });
    setFields([...nFeilds]);
  };


  return (
    <>
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">Schema</legend>
        {fields.map((f: any) => {
          return (
            <div key={f.colName} className="grid gap-3">
              <Label htmlFor={f.colName}>{f.colName}</Label>
              <Select
                onValueChange={(e) => handleTypeSelect(f.colName, e)}
                defaultValue={f.colType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  {DATA_TYPES.map((t) => {
                    return (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          );
        })}
        <Button onClick={handleCreateTable}>Create Table</Button>
      </fieldset>
    </>
  );
}

export default SchemaSettings;
