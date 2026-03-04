import { ComponentMetadata } from "@/types";
import { SplitText } from "@/components/animations/SplitText";

export const splitTextComponent: ComponentMetadata = {
  name: "SplitText",
  slug: "split-text",
  description: "A beautiful text splitting animation using GSAP.",

  title: "Split Text",
  preview: {
    component: SplitText,
  },

  intelligence: {
    dependencies: ["gsap", "@gsap/react"],
    registryDependencies: ["gsap", "@gsap/react"],
    sizeGzip: "2.4kb",
    isSsrSafe: true,
    isRscReady: true,
    isAccessible: true,
    popularity: 98,
    isFree: true,
  },

  variants: {
    "ts-css": {
      language: "ts",
      styling: "css",
      filePath: "src/components/animations/text/SplitText.tsx" // In the future, this maps to the specific component
    },
    "js-css": {
      language: "js",
      styling: "css",
      filePath: "src/components/animations/text/SplitText.jsx"
    }
  },

  props: {
    text: {
      type: "string",
      defaultValue: "Hello World!",
      description: "The text to animate.",
    },
    easing: {
      type: "select",
      defaultValue: "power4.out",
      options: ["power4.out", "elastic.out(1, 0.3)", "back.out(1.7)", "circ.inOut"],
      description: "Animation easing function",
    },
    speed: {
      type: "number",
      defaultValue: 0.5,
      min: 0.1,
      max: 2,
      step: 0.1,
      description: "Animation speed divisor",
    },
    delay: {
      type: "number",
      defaultValue: 0.05,
      min: 0,
      max: 0.5,
      step: 0.01,
      description: "Stagger delay between characters",
    },
  
  },

  install: {
    jsrepo: "npx jsrepo add split-text",
    npm: "npm install @reactmint/split-text",
  },

  code: {
    ts: `import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

// Only register plugins purely on the client-side tightly with our component context
// to prevent messy global space pollution or SSR mismatch
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export interface SplitTextProps {
  /** Unstyled text to split */
  text: string;
  /** Primary tag of the wrapper element (e.g., 'h1', 'p') */
  as?: React.ElementType;
  /** Master container stylings */
  className?: string;
  /** Word or Char split element stylings */
  splitClassName?: string;
  /** Divides how the text is cut: 'chars' for character-by-character, 'words' for word-by-word */
  splitBy?: 'chars' | 'words';
  /** Base delay before the timeline begins */
  delay?: number;
  /** Staggering step gap between items (in seconds) */
  stagger?: number;
  /** Animation duration per element */
  duration?: number;
  /** Provide an exact easing curve natively supported by GSAP */
  ease?: string;
  /** Starting animation state */
  initialState?: gsap.TweenVars;
  /** Desired ending animation state */
  animateState?: gsap.TweenVars;
  /** Provide a callback for when the sequence finishes entirely */
  onComplete?: () => void;
  /** Fallback mode to display without JS if desired */
  ssrFallback?: boolean;
}

export const SplitText = React.forwardRef<HTMLElement, SplitTextProps>(
  (
    {
      text,
      as: Tag = 'p',
      className = '',
      splitClassName = '',
      splitBy = 'chars',
      delay = 0,
      stagger = 0.05,
      duration = 0.8,
      ease = 'power4.out',
      initialState = { opacity: 0, y: 30, scale: 0.9 },
      animateState = { opacity: 1, y: 0, scale: 1 },
      onComplete,
      ssrFallback = false,
      ...props
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    // Merge refs neatly
    useEffect(() => {
      setIsMounted(true);
      if (!forwardedRef) return;
      if (typeof forwardedRef === 'function') {
        forwardedRef(internalRef.current);
      } else {
        forwardedRef.current = internalRef.current;
      }
    }, [forwardedRef]);

    // Setup our internal split logic (A purely deterministic non-plugin split)
    // This removes the heavy 'gsap/SplitText' premium plugin dependency, replacing it
    // with an exact deterministic split tree optimized specifically for our needs.
    const segments = splitBy === 'words' ? text.split(' ') : text.split('');

    useGSAP(
      () => {
        if (!isMounted || !internalRef.current) return;

        const elements = gsap.utils.toArray<HTMLElement>('.reactmint-split-segment', internalRef.current);
        if (elements.length === 0) return;

        gsap.fromTo(
          elements,
          { ...initialState },
          {
            ...animateState,
            duration,
            stagger: {
              each: stagger,
              from: 'start',
            },
            delay,
            ease,
            onComplete: () => {
              if (onComplete) onComplete();
            },
            clearProps: 'transform,opacity', // Leave DOM clean after animation
          }
        );
      },
      { scope: internalRef, dependencies: [isMounted, text, splitBy, delay, stagger, duration, ease] }
    );

    // Provide immediate un-animated render if SSR / prior to mount (if fallback configured)
    if (!isMounted && ssrFallback) {
      return (
        <Tag ref={internalRef} className={className} {...props}>
          {text}
        </Tag>
      );
    }

    // Google-grade accessibility: We present the real text plainly to screen readers via typical 
    // \`sr-only\` classes, while hiding our heavily sliced wrapper tree from aria via \`aria-hidden="true"\`.
    return (
      <Tag ref={internalRef} className={\`relative inline-block \${className}\`} {...props}>
        <span className="sr-only">{text}</span>
        <span aria-hidden="true" className="inline-block pointer-events-none">
          {segments.map((segment, index) => {
            // Restore spaces properly if word-splitting vs char-splitting
            const content = segment === '' && splitBy === 'chars' ? '\\u00A0' : segment;
            const suffixSpace = splitBy === 'words' && index !== segments.length - 1 ? '\\u00A0' : '';

            return (
              <React.Fragment key={index}>
                <span className={\`reactmint-split-segment inline-block will-change-transform \${splitClassName}\`}>
                  {content}
                </span>
                {suffixSpace && <span className="inline-block">{suffixSpace}</span>}
              </React.Fragment>
            );
          })}
        </span>
      </Tag>
    );
  }
);

SplitText.displayName = 'SplitText';`,
    js: `import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export const SplitText = React.forwardRef(
  (
    {
      text,
      as: Tag = 'p',
      className = '',
      splitClassName = '',
      splitBy = 'chars',
      delay = 0,
      stagger = 0.05,
      duration = 0.8,
      ease = 'power4.out',
      initialState = { opacity: 0, y: 30, scale: 0.9 },
      animateState = { opacity: 1, y: 0, scale: 1 },
      onComplete,
      ssrFallback = false,
      ...props
    },
    forwardedRef
  ) => {
    const internalRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
      if (!forwardedRef) return;
      if (typeof forwardedRef === 'function') {
        forwardedRef(internalRef.current);
      } else {
        forwardedRef.current = internalRef.current;
      }
    }, [forwardedRef]);

    const segments = splitBy === 'words' ? text.split(' ') : text.split('');

    useGSAP(
      () => {
        if (!isMounted || !internalRef.current) return;

        const elements = gsap.utils.toArray('.reactmint-split-segment', internalRef.current);
        if (elements.length === 0) return;

        gsap.fromTo(
          elements,
          { ...initialState },
          {
            ...animateState,
            duration,
            stagger: {
              each: stagger,
              from: 'start',
            },
            delay,
            ease,
            onComplete: () => {
              if (onComplete) onComplete();
            },
            clearProps: 'transform,opacity',
          }
        );
      },
      { scope: internalRef, dependencies: [isMounted, text, splitBy, delay, stagger, duration, ease] }
    );

    if (!isMounted && ssrFallback) {
      return (
        <Tag ref={internalRef} className={className} {...props}>
          {text}
        </Tag>
      );
    }

    return (
      <Tag ref={internalRef} className={\`relative inline-block \${className}\`} {...props}>
        <span className="sr-only">{text}</span>
        <span aria-hidden="true" className="inline-block pointer-events-none">
          {segments.map((segment, index) => {
            const content = segment === '' && splitBy === 'chars' ? '\\u00A0' : segment;
            const suffixSpace = splitBy === 'words' && index !== segments.length - 1 ? '\\u00A0' : '';

            return (
              <React.Fragment key={index}>
                <span className={\`reactmint-split-segment inline-block will-change-transform \${splitClassName}\`}>
                  {content}
                </span>
                {suffixSpace && <span className="inline-block">{suffixSpace}</span>}
              </React.Fragment>
            );
          })}
        </span>
      </Tag>
    );
  }
);

SplitText.displayName = 'SplitText';`,
    tailwind: ``,
    css: `.reactmint-split-segment {
  display: inline-block;
  will-change: transform, opacity;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
`
  },
  usage: {
    ts: `import { SplitText } from "@/components/SplitText";

export default function App() {
  const handleOnComplete = () => {
    console.log("Animation complete!");
  };

  return (
    <div className="flex flex-col items-center gap-6 p-12">
      {/* 1. Basic Character Split */}
      <SplitText 
        as="h1"
        text="Dynamic Text" 
        className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100" 
      />

      {/* 2. Word Split with custom physics & bounce */}
      <SplitText 
        text="A Google-grade experience" 
        splitBy="words"
        stagger={0.1}
        duration={1.2}
        ease="elastic.out(1, 0.4)"
        initialState={{ opacity: 0, y: 50, rotateX: 90 }}
        className="text-2xl font-serif italic text-emerald-500" 
      />

      {/* 3. Fully tailored callback chain */}
      <SplitText 
        text="ReactMint Animations" 
        delay={0.5}
        stagger={0.02}
        duration={2}
        className="text-lg font-mono uppercase tracking-widest text-blue-500" 
        onComplete={handleOnComplete}
      />
    </div>
  );
}`,
    js: `import { SplitText } from "@/components/SplitText";

export default function App() {
  const handleOnComplete = () => {
    console.log("Animation complete!");
  };

  return (
    <div className="flex flex-col items-center gap-6 p-12">
      <SplitText 
        as="h1"
        text="Dynamic Text" 
        className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100" 
      />

      <SplitText 
        text="A Google-grade experience" 
        splitBy="words"
        stagger={0.1}
        duration={1.2}
        ease="elastic.out(1, 0.4)"
        initialState={{ opacity: 0, y: 50, rotateX: 90 }}
        className="text-2xl font-serif italic text-emerald-500" 
      />

      <SplitText 
        text="ReactMint Animations" 
        delay={0.5}
        stagger={0.02}
        duration={2}
        className="text-lg font-mono uppercase tracking-widest text-blue-500" 
        onComplete={handleOnComplete}
      />
    </div>
  );
}`
  }
};
