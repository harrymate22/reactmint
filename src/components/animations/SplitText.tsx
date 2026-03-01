"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface SplitTextProps {
  text?: string;
  speed?: number;
  delay?: number;
  easing?: string;
  className?: string;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text = "Hello World!",
  speed = 0.5,
  delay = 0.05,
  easing = "power4.out",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.children;
    
    // Reset state before animating (important for live preview re-renders)
    gsap.set(elements, { opacity: 0, y: 20 });
    
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: speed,
      stagger: delay,
      ease: easing,
    });
  }, [text, speed, delay, easing]);

  // Split by space for words. For letter splitting, you would split by ""
  const words = text.split(" ");

  return (
    <div 
      ref={containerRef} 
      className={`flex flex-wrap gap-x-2 gap-y-1 justify-center text-4xl md:text-5xl font-extrabold tracking-tight ${className}`}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block opacity-0 translate-y-[20px]">
          {word}
        </span>
      ))}
    </div>
  );
};

export default SplitText;
