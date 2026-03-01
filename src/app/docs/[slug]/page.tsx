"use client";

import { useState, use } from "react";
import { notFound } from "next/navigation";
import { getComponentBySlug } from "@/content/components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const component = getComponentBySlug(slug);
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");

  if (!component) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {component.name}
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
          {component.description}
        </p>
      </div>

      <Tabs defaultValue="preview" className="w-full relative z-10">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="bg-background border border-foreground/10 rounded-full h-auto p-1 relative z-20 shadow-sm">
            <TabsTrigger value="preview" className="rounded-full px-4 py-1.5 text-xs font-semibold data-[state=active]:bg-foreground/10 data-[state=active]:text-foreground text-muted-foreground flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
               Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="rounded-full px-4 py-1.5 text-xs font-semibold data-[state=active]:bg-foreground/10 data-[state=active]:text-foreground text-muted-foreground flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
               Code
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2 hidden sm:flex">
             <button className="flex items-center justify-center p-2 rounded-full border border-foreground/10 hover:bg-foreground/5 text-muted-foreground hover:text-foreground transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg></button>
             <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-foreground/10 hover:bg-foreground/5 text-muted-foreground hover:text-foreground transition-colors text-xs font-semibold"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg> Contribute</button>
          </div>
        </div>

        <TabsContent value="preview" className="mt-0 border border-foreground/10 rounded-2xl p-6 flex justify-center items-center min-h-[400px] bg-zinc-50 dark:bg-zinc-950/50 shadow-inner relative overflow-hidden">
          {(() => {
            const PreviewComponent = component.preview.component;
            return PreviewComponent ? (
              <PreviewComponent />
            ) : (
              <div className="text-muted-foreground text-sm flex flex-col items-center">
                <span>Preview for {component.name}</span>
                <span className="text-xs mt-1">(Component coming soon)</span>
              </div>
            );
          })()}
        </TabsContent>
        <TabsContent value="code" className="mt-0">
          <div className="relative border border-foreground/10 rounded-2xl overflow-hidden bg-[#0d0d0d]">
            <pre className="p-6 text-zinc-300 overflow-x-auto text-sm font-mono leading-relaxed">
              <code>{component.code.ts}</code>
            </pre>
          </div>
        </TabsContent>
      </Tabs>

      {/* Install Section */}
      <section className="pt-8 border-t border-foreground/5">
         <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">Install</h2>
         
         <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <div className="flex bg-background border border-foreground/10 rounded-full p-1 h-auto">
               <button 
                 onClick={() => setInstallTab("cli")}
                 className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${installTab === "cli" ? "bg-foreground/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
               >
                 CLI
               </button>
               <button 
                 onClick={() => setInstallTab("manual")}
                 className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${installTab === "manual" ? "bg-foreground/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
               >
                 Manual
               </button>
            </div>
            
            {installTab === "cli" && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-foreground/10 text-foreground transition-colors text-sm font-medium bg-transparent cursor-default select-none">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="14" height="14" className="text-foreground"><rect width="256" height="256" fill="none"/><line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/></svg>
                 <span className="text-muted-foreground tracking-wide">shadcn</span>
              </div>
            )}
         </div>

         <div className="border border-foreground/10 rounded-xl overflow-hidden bg-background">
            <div className="flex items-center gap-6 px-4 py-3 border-b border-foreground/5 text-xs font-mono text-muted-foreground select-none overflow-x-auto">
               <span className="text-primary font-semibold hover:text-primary cursor-pointer">pnpm</span>
               <span className="hover:text-foreground cursor-pointer transition-colors">npm</span>
               <span className="hover:text-foreground cursor-pointer transition-colors">yarn</span>
               <span className="hover:text-foreground cursor-pointer transition-colors">bun</span>
            </div>
            <div className="relative">
              <pre className="p-4 md:p-6 text-zinc-300 overflow-x-auto text-sm font-mono leading-relaxed bg-[#0d0d0d]">
                {installTab === "cli" ? (
                  <code>{component.install.shadcn || `npx shadcn@latest add ${component.slug}`}</code>
                ) : (
                  <code>{`npm install ${component.slug}`}</code>
                )}
              </pre>
              <button className="absolute top-4 right-4 p-2 rounded-md border border-white/10 hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              </button>
            </div>
         </div>
      </section>

      {/* Code Section */}
      <section className="pt-8">
         <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">Code</h2>
         
         <div className="flex items-center gap-3 mb-4 flex-wrap relative z-20">
            <details className="relative group">
               <summary className="flex items-center gap-2 px-4 py-2 rounded-full border border-foreground/10 hover:border-foreground/20 text-foreground transition-colors text-sm font-medium bg-transparent cursor-pointer list-none [&::-webkit-details-marker]:hidden focus:outline-none focus:ring-2 focus:ring-foreground/20">
                  <span className="font-bold text-foreground">TS</span>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors tracking-wide">TypeScript</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 ml-1 group-open:rotate-180 transition-transform"><path d="m6 9 6 6 6-6"/></svg>
               </summary>
               <div className="absolute top-full left-0 mt-2 w-48 rounded-2xl border border-foreground/10 bg-[#0d0d0d] shadow-2xl p-1.5 z-50 hidden group-open:block">
                 <div className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-foreground bg-white/5 transition-colors cursor-default select-none">
                   <span className="flex items-center gap-2"><strong className="font-bold text-white">TS</strong> <span className="text-zinc-300">TypeScript</span></span>
                   <div className="w-2 h-2 rounded-full bg-[#38bdf8]"></div>
                 </div>
                 <div className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors cursor-pointer select-none">
                   <span className="flex items-center gap-2"><strong className="font-bold">JS</strong> JavaScript</span>
                 </div>
               </div>
            </details>

            <details className="relative group">
               <summary className="flex items-center gap-2 px-4 py-2 rounded-full border border-foreground/10 hover:border-foreground/20 text-foreground transition-colors text-sm font-medium bg-transparent cursor-pointer list-none [&::-webkit-details-marker]:hidden focus:outline-none focus:ring-2 focus:ring-foreground/20">
                   <svg fill="currentColor" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-[#38bdf8]"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fillRule="evenodd" clipRule="evenodd" d="M12 6.036c-2.667 0-4.333 1.325-5 3.976 1-1.325 2.167-1.822 3.5-1.491.761.189 1.305.738 1.906 1.345C13.387 10.855 14.522 12 17 12c2.667 0 4.333-1.325 5-3.976-1 1.325-2.166 1.822-3.5 1.491-.761-.189-1.305-.738-1.907-1.345-.98-.99-2.114-2.134-4.593-2.134zM7 12c-2.667 0-4.333 1.325-5 3.976 1-1.326 2.167-1.822 3.5-1.491.761.189 1.305.738 1.907 1.345.98.989 2.115 2.134 4.594 2.134 2.667 0 4.333-1.325 5-3.976-1 1.325-2.167 1.822-3.5 1.491-.761-.189-1.305-.738-1.906-1.345C10.613 13.145 9.478 12 7 12z"></path></g></svg>
                   <span className="text-muted-foreground group-hover:text-foreground transition-colors tracking-wide">Tailwind</span>
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 ml-1 group-open:rotate-180 transition-transform"><path d="m6 9 6 6 6-6"/></svg>
               </summary>
               <div className="absolute top-full left-0 mt-2 w-44 rounded-2xl border border-foreground/10 bg-[#0d0d0d] shadow-2xl p-1.5 z-50 hidden group-open:block">
                 <div className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors cursor-pointer select-none">
                   <span className="flex items-center gap-2"><strong className="font-bold text-white tracking-widest">CSS</strong> CSS</span>
                 </div>
                 <div className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-foreground bg-white/5 transition-colors mt-1 cursor-default select-none">
                   <span className="flex items-center gap-2">
                     <svg fill="currentColor" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-[#38bdf8]"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fillRule="evenodd" clipRule="evenodd" d="M12 6.036c-2.667 0-4.333 1.325-5 3.976 1-1.325 2.167-1.822 3.5-1.491.761.189 1.305.738 1.906 1.345C13.387 10.855 14.522 12 17 12c2.667 0 4.333-1.325 5-3.976-1 1.325-2.166 1.822-3.5 1.491-.761-.189-1.305-.738-1.907-1.345-.98-.99-2.114-2.134-4.593-2.134zM7 12c-2.667 0-4.333 1.325-5 3.976 1-1.326 2.167-1.822 3.5-1.491.761.189 1.305.738 1.907 1.345.98.989 2.115 2.134 4.594 2.134 2.667 0 4.333-1.325 5-3.976-1 1.325-2.167 1.822-3.5 1.491-.761-.189-1.305-.738-1.906-1.345C10.613 13.145 9.478 12 7 12z"></path></g></svg>
                     <span className="text-zinc-300">Tailwind</span>
                   </span>
                   <div className="w-2 h-2 rounded-full bg-[#38bdf8]"></div>
                 </div>
               </div>
            </details>
         </div>

         <div className="border border-foreground/10 rounded-xl overflow-hidden bg-background relative">
           <pre className="p-4 md:p-6 text-zinc-300 overflow-x-auto text-sm font-mono leading-relaxed bg-[#0d0d0d] max-h-[500px] scrollbar-thin scrollbar-thumb-white/10">
             <code>{component.code.ts}</code>
           </pre>
           <button className="absolute top-4 right-4 p-2 rounded-md border border-white/10 hover:bg-white/10 text-white/50 hover:text-white transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
           </button>
           <div className="absolute bottom-6 right-6 flex items-center justify-center">
             <button className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md transition-colors border border-white/10">
               Expand Snippet
             </button>
           </div>
         </div>
      </section>
    </div>
  );
}
