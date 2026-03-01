import React from "react";

export type ComponentIntelligence = {
  dependencies: string[];
  sizeGzip: string;
  isSsrSafe: boolean;
  isRscReady: boolean;
  isAccessible: boolean;
  popularity: number;
  isFree?: boolean; // defaults to true if omitted out of ease
};

export type ComponentPropDef = {
  type: "string" | "number" | "boolean" | "select" | "color";
  defaultValue: string | number | boolean;
  options?: string[]; // Used for select type
  min?: number;       // Used for number type
  max?: number;       // Used for number type
  step?: number;      // Used for number type
  description?: string;
};

export type ComponentMetadata = {
  name: string;
  slug: string;
  description: string;
  preview: {
    component: React.ComponentType<any> | null; // Will take props dynamically
  };
  intelligence: ComponentIntelligence;
  props: Record<string, ComponentPropDef>;
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
  usage?: {
    ts: string;
    js: string;
  };
};
