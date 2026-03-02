"use client";

import React, { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';
import { useTheme } from 'next-themes';

interface CodeHighlighterProps {
  code: string;
  lang?: string;
}

export function CodeHighlighter({ code, lang = 'tsx' }: CodeHighlighterProps) {
  const [html, setHtml] = useState<string>('');
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    let isMounted = true;
    
    const highlight = async () => {
      try {
        // Fallback or override logic for css
        const language = lang === 'css' ? 'css' : (lang === 'ts' || lang === 'tsx') ? 'tsx' : 'jsx';
        const shikiTheme = resolvedTheme === 'light' ? 'vitesse-light' : 'vitesse-dark';

        const result = await codeToHtml(code, {
          lang: language,
          theme: shikiTheme,
        });
        
        if (isMounted) {
          setHtml(result);
        }
      } catch (err) {
        console.error("Failed to highlight code:", err);
        if (isMounted) {
          setHtml(`<pre><code>${code}</code></pre>`);
        }
      }
    };

    if (resolvedTheme) {
      highlight();
    }

    return () => {
      isMounted = false;
    };
  }, [code, lang, resolvedTheme]);

  return (
    <div 
      className="text-[14px] [&>pre]:!bg-transparent [&>pre]:!m-0 [&>pre]:!p-0 [&_code]:[counter-reset:line] [&_.line::before]:[content:counter(line)] [&_.line::before]:[counter-increment:line] [&_.line::before]:inline-block [&_.line::before]:w-3 [&_.line::before]:mr-6 [&_.line::before]:text-right [&_.line::before]:text-zinc-500/50"
      dangerouslySetInnerHTML={{ __html: html || `<pre><code>${code}</code></pre>` }}
    />
  );
}
