import React from "react";

import {useCodeEditor} from "@client/hooks/useCodeEditor";

export default function SQLEditor({ value, onChange, extensions, className }) {
  const ref: any = useCodeEditor({ value, onChange, extensions });

  return <div className={className} ref={ref} />;
}