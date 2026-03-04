"use client";

import React, { useRef, useEffect, useState } from 'react';
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
    // `sr-only` classes, while hiding our heavily sliced wrapper tree from aria via `aria-hidden="true"`.
    return (
      <Tag ref={internalRef} className={`relative inline-block ${className}`} {...props}>
        <span className="sr-only absolute w-[1px] h-[1px] p-0 -m-[1px] overflow-hidden whitespace-nowrap border-0 [clip:rect(0,0,0,0)]">{text}</span>
        <span aria-hidden="true" className="inline-block pointer-events-none">
          {segments.map((segment, index) => {
            // Restore spaces properly if word-splitting vs char-splitting
            const content = segment === '' && splitBy === 'chars' ? '\u00A0' : segment;
            const suffixSpace = splitBy === 'words' && index !== segments.length - 1 ? '\u00A0' : '';

            return (
              <React.Fragment key={index}>
                <span className={`reactmint-split-segment inline-block will-change-transform ${splitClassName}`}>
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

SplitText.displayName = 'SplitText';
