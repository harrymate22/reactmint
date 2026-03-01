import { ComponentMetadata } from "@/types";

export const splitTextComponent: ComponentMetadata = {
  name: "SplitText",
  slug: "split-text",
  description: "A beautiful text splitting animation using GSAP.",

  preview: {
    // component: SplitTextPreview,
    component: null, // Placeholder until component is built
  },

  install: {
    shadcn:
      "npx shadcn add https://reactmint.com/api/components/split-text.json",
    jsrepo: "npx jsrepo add split-text",
    npm: "npm install @reactmint/split-text",
  },

  code: {
    ts: `import React from 'react';

export const SplitText = ({ text }: { text: string }) => {
  return <div>{text}</div>;
};
`,
    js: `import React from 'react';

export const SplitText = ({ text }) => {
  return <div>{text}</div>;
};
`,
    tailwind: `export const SplitText = ({ text }: { text: string }) => {
  return <div className="text-4xl font-bold tracking-tight">{text}</div>;
};`,
    css: `.split-text { font-size: 2rem; font-weight: bold; }`,
  },
};
