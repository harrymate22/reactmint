"use client";

import React, { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';

interface CodeHighlighterProps {
  code: string;
  lang?: string;
}

export function CodeHighlighter({ code, lang = 'tsx' }: CodeHighlighterProps) {
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    
    const highlight = async () => {
      try {
        // Fallback or override logic for css
        const language = lang === 'css' ? 'css' : (lang === 'ts' || lang === 'tsx') ? 'tsx' : 'jsx';

        const result = await codeToHtml(code, {
          lang: language,
          theme: 'vitesse-dark',
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

    highlight();

    return () => {
      isMounted = false;
    };
  }, [code, lang]);

  return (
    <div 
      className="[&>pre]:!bg-transparent [&>pre]:!m-0 [&>pre]:!p-0"
      dangerouslySetInnerHTML={{ __html: html || `<pre><code>${code}</code></pre>` }}
    />
  );
}
