"use client";

import React, { useState } from "react";
import { Input } from "@mintuix/input";

export function InputPreview(props: any) {
  const [value, setValue] = useState("");

  return (
    <div className="w-full max-w-sm flex items-center justify-center p-4">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
    </div>
  );
}

export default InputPreview;
