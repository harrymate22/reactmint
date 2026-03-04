import { ComponentMetadata } from "@/types";
import { InputPreview } from "@/components/previews/InputPreview";

export const inputComponent: ComponentMetadata = {
  name: "Input",
  slug: "input",
  description: "A versatile, styling-agnostic input component with built-in floating labels, error states, and multi-platform variant designs.",

  title: "Input Base",
  preview: {
    component: InputPreview,
  },

  intelligence: {
    dependencies: [],
    registryDependencies: [],
    sizeGzip: "1.4kb",
    isSsrSafe: true,
    isRscReady: false, // uses useState
    isAccessible: true,
    popularity: 92,
    isFree: true,
  },

  props: {
    variant: {
      type: "select",
      defaultValue: "default",
      options: ["default", "ios", "android", "glass"],
      description: "Design style variants",
    },
    inputSize: {
      type: "select",
      defaultValue: "md",
      options: ["sm", "md", "lg"],
      description: "Size dimensions of the input",
    },
    label: {
      type: "string",
      defaultValue: "Email Address",
      description: "Input label text",
    },
    floatingLabel: {
      type: "boolean",
      defaultValue: true,
      description: "Animates label into a floating state",
    },
    placeholder: {
      type: "string",
      defaultValue: "Enter your email...",
      description: "Input placeholder text",
    },
    error: {
      type: "string",
      defaultValue: "",
      description: "Error message and styling trigger",
    },
    focusColor: {
      type: "color",
      defaultValue: "#ef4444",
      description: "Custom color for active/focus states (Hex, RGB, etc.)",
    },
  },

  install: {
    jsrepo: "npx jsrepo add input",
    npm: "npm install @mintuix/input",
  },

  code: {
    ts: `import { Input } from "@mintuix/input";

export function BasicInput() {
  return (
    <Input
      label="Email Address"
      placeholder="you@example.com"
      type="email"
    />
  );
}`,
    js: `import { Input } from "@mintuix/input";

export function BasicInput() {
  return (
    <Input
      label="Email Address"
      placeholder="you@example.com"
      type="email"
    />
  );
}`,
    css: `/* Required for the 'glass' variant only */
/* Add this to your global CSS file */

.glass-effect {
  position: relative;
  overflow: hidden;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transform: translateZ(0);
  --lg-highlight: rgba(255, 255, 255, 0.8);
  --lg-bg-color: rgba(255, 255, 255, 0.4);
}

.dark .glass-effect {
  --lg-highlight: rgba(255, 255, 255, 0.15);
  --lg-bg-color: rgba(0, 0, 0, 0.2);
}

.glass-effect::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  background: var(--lg-bg-color);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: inherit;
}

.glass-effect::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 2;
  border-radius: inherit;
  box-shadow:
    inset 1px 1px 0 var(--lg-highlight),
    inset 0 0 5px var(--lg-highlight);
  pointer-events: none;
}

.glass-effect > * {
  position: relative;
  z-index: 3;
}`,
    tailwind: ``,
  },

  usage: {
    ts: `import { Input } from "@mintuix/input";

export function LoginForm() {
  return (
    <form className="flex flex-col gap-4 max-w-sm">
      <Input
        label="Username"
        placeholder="Enter your username"
        variant="default"
        floatingLabel
      />

      <Input
        label="Password"
        type="password"
        variant="default"
        floatingLabel
        error="Password must be at least 8 characters"
      />

      <Input
        label="Phone Number"
        variant="ios"
        inputSize="lg"
        floatingLabel
      />

      <Input
        label="Organization"
        variant="android"
        floatingLabel
        focusColor="#db2777"
      />
    </form>
  );
}`,
    js: `import { Input } from "@mintuix/input";

export function LoginForm() {
  return (
    <form className="flex flex-col gap-4 max-w-sm">
      <Input
        label="Username"
        placeholder="Enter your username"
        variant="default"
        floatingLabel
      />

      <Input
        label="Password"
        type="password"
        variant="default"
        floatingLabel
        error="Password must be at least 8 characters"
      />

      <Input
        label="Phone Number"
        variant="ios"
        inputSize="lg"
        floatingLabel
      />

      <Input
        label="Organization"
        variant="android"
        floatingLabel
        focusColor="#db2777"
      />
    </form>
  );
}`,
  },
};

