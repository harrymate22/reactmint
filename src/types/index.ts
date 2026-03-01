import React from "react";

export type ComponentMetadata = {
  name: string;
  slug: string;
  description: string;
  preview: {
    component: React.ComponentType<any> | null;
  };
  install: {
    shadcn: string;
    jsrepo: string;
    npm: string;
  };
  code: {
    ts: string;
    js: string;
    tailwind: string;
    css: string;
  };
};
