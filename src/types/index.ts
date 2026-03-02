import React from "react";

export type ComponentIntelligence = {
  dependencies: string[];
  registryDependencies: string[]; // e.g. ["gsap"]
  sizeGzip: string;
  isSsrSafe: boolean;
  isRscReady: boolean;
  isAccessible: boolean;
  popularity: number;
  isFree?: boolean; 
};

export type ComponentPropDef = {
  type: "string" | "number" | "boolean" | "select" | "color";
  defaultValue: string | number | boolean;
  options?: string[];
  min?: number;       
  max?: number;       
  step?: number;      
  description?: string;
};

export type VariantKey = "ts-css" | "ts-tw" | "js-css" | "js-tw";
export type InstallMode = "cli" | "manual";
export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

export type ComponentVariantInfo = {
  language: "ts" | "js";
  styling: "css" | "tailwind";
  filePath: string;
};

export type ComponentMetadata = {
  name: string;
  slug: string; // The URL slug e.g. "split-text"
  title: string;
  description: string;
  preview: {
    component: React.ComponentType<any> | null;
  };
  intelligence: ComponentIntelligence;
  props: Record<string, ComponentPropDef>;
  
  variants?: Partial<Record<VariantKey, ComponentVariantInfo>>;
  
  /** 
   * @deprecated Hardcoded installs are replaced by generateInstallCommand logic
   */
  install?: {
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
