"use client";

import { useState, use } from "react";
import { notFound } from "next/navigation";
import { getComponentBySlug } from "@/content/components";
import { useTheme } from "next-themes";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import Image from "next/image";
import { CodeHighlighter } from "@/components/docs/CodeHighlighter";
import { generateInstallCommand } from "@/install-engine/generateCommand";
import type { InstallMode, VariantKey, PackageManager } from "@/types";

export default function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { theme } = useTheme();
  const component = getComponentBySlug(slug);
  const [activeTab, setActiveTab] = useState<"preview" | "code" | "playground">("preview");
  const [installTab, setInstallTab] = useState<InstallMode>("cli");
  const [framework, setFramework] = useState<"next" | "vite" | "remix">("next");
  const [packageManager, setPackageManager] = useState<PackageManager>("pnpm");
  const [copied, setCopied] = useState("");
  const [codeLang, setCodeLang] = useState<"ts" | "js">("ts");
  const [codeStyle, setCodeStyle] = useState<"tailwind" | "css" | "variants">("tailwind");
  const [previewKey, setPreviewKey] = useState(0);
  const [isCodeExpanded, setIsCodeExpanded] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isStyleDropdownOpen, setIsStyleDropdownOpen] = useState(false);

  const [customProps, setCustomProps] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    if (component?.props) {
      Object.keys(component.props).forEach(key => {
        initial[key] = component.props![key].defaultValue;
      });
    }
    return initial;
  });

  const handlePropChange = (key: string, value: any) => {
    setCustomProps(prev => ({ ...prev, [key]: value }));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  if (!component) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
            {component.name}
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-4 text-lg text-muted-foreground w-full max-w-3xl">
            {component.description}
          </p>
        </div>

        {/* Dev Metrics Dashboard */}
        <div className="flex flex-wrap items-center gap-3">
           <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              {component.intelligence?.popularity ?? 90}% Popularity
           </div>
           <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/50 border border-black/5 dark:border-white/5 text-foreground text-xs font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>
              {component.intelligence?.sizeGzip ?? "2.0kb"} gzipped
           </div>
           {component.intelligence?.isFree && (
             <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                100% Free
             </div>
           )}
           <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M4 12h16"/></svg>
              AI-Ready
           </div>
        </div>
      </div>

      {/* Tab System */}
      <div className="w-full relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-background border border-foreground/10 rounded-full h-auto p-1 relative z-20 shadow-sm overflow-x-auto flex flex-nowrap w-max max-w-full">
            {(["preview", "code", "playground"] as const).map((tab) => {
              const icons: Record<string, React.ReactNode> = {
                preview: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
                code: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
                playground: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={activeTab === "playground" ? "text-blue-500" : ""}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
              };
              const labels: Record<string, string> = { preview: "Preview", code: "Code", playground: "Live Playground" };
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === tab ? "bg-foreground/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {icons[tab]}
                  {labels[tab]}
                </button>
              );
            })}
          </div>
          
          <div className="items-center gap-2 hidden sm:flex">
             <button className="flex items-center justify-center p-2 rounded-full border border-foreground/10 hover:bg-foreground/5 text-muted-foreground hover:text-foreground transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg></button>
             <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-foreground/10 hover:bg-foreground/5 text-muted-foreground hover:text-foreground transition-colors text-xs font-semibold"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg> Contribute</button>
          </div>
        </div>

        {/* Preview Tab */}
        {activeTab === "preview" && (
          <div className="flex flex-col gap-6 w-full">
            <div className="border border-foreground/10 rounded-2xl p-6 flex justify-center items-center min-h-[400px] bg-zinc-50 dark:bg-zinc-950/50 shadow-inner relative overflow-hidden group">
              <button 
                onClick={() => setPreviewKey(k => k + 1)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-background/50 backdrop-blur-md border border-foreground/10 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity z-10"
                title="Refresh animation"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              </button>
              {(() => {
                const PreviewComponent = component.preview.component;
                return PreviewComponent ? (
                  <div key={previewKey} className="w-full flex justify-center">
                    <PreviewComponent {...customProps} />
                  </div>
                ) : (
                  <div className="text-muted-foreground text-sm flex flex-col items-center">
                    <span>Preview for {component.name}</span>
                    <span className="text-xs mt-1">(Component coming soon)</span>
                  </div>
                );
              })()}
            </div>

            {/* Customizer Props Panel */}
            {component.props && Object.keys(component.props).length > 0 && (
              <div className="border border-foreground/10 rounded-2xl bg-background p-6">
                 <h3 className="text-sm font-bold mb-6 flex items-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                   Prop Controls
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                   {Object.entries(component.props).map(([key, propDef]) => (
                     <div key={key} className={`space-y-3 ${propDef.type === "color" ? "md:col-span-2" : ""}`}>
                       <div className="flex justify-between items-center text-sm">
                         <span className="text-foreground font-medium flex items-center gap-2">
                           <span className="font-mono text-xs bg-foreground/5 px-1.5 py-0.5 rounded border border-foreground/10">{key}</span>
                           {propDef.description && <span className="text-muted-foreground text-[10px] hidden lg:inline-block">{propDef.description}</span>}
                         </span>
                         <span className="text-muted-foreground font-mono text-xs max-w-[100px] truncate" title={String(customProps[key])}>
                           {typeof customProps[key] === "object" ? "Object" : String(customProps[key])}
                         </span>
                       </div>
                       
                       {propDef.type === "number" && (
                         <input 
                           type="range" 
                           min={propDef.min} 
                           max={propDef.max} 
                           step={propDef.step} 
                           value={customProps[key]} 
                           onChange={(e) => handlePropChange(key, parseFloat(e.target.value))}
                           className="w-full accent-primary h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer" 
                         />
                       )}

                       {propDef.type === "string" && (
                         <input 
                           type="text" 
                           value={customProps[key]} 
                           onChange={(e) => handlePropChange(key, e.target.value)}
                           className="w-full bg-background border border-foreground/10 rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" 
                         />
                       )}

                       {propDef.type === "select" && propDef.options && (
                         <div className="relative">
                           <select 
                             value={customProps[key]} 
                             onChange={(e) => handlePropChange(key, e.target.value)}
                             className="w-full bg-background border border-foreground/10 rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none pr-8 cursor-pointer" 
                           >
                             {propDef.options.map(opt => <option key={opt} value={opt} className="bg-background text-foreground">{opt}</option>)}
                           </select>
                           <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                             <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                           </div>
                         </div>
                       )}

                       {propDef.type === "boolean" && (
                         <button 
                           onClick={() => handlePropChange(key, !customProps[key])}
                           className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${customProps[key] ? 'bg-primary' : 'bg-foreground/10'}`}
                         >
                           <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${customProps[key] ? 'translate-x-5' : 'translate-x-1'}`} />
                         </button>
                       )}

                       {propDef.type === "color" && (
                         <div className="relative flex items-center bg-background border border-foreground/10 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all p-1">
                           <input 
                             type="color" 
                             value={customProps[key]} 
                             onChange={(e) => handlePropChange(key, e.target.value)}
                             className="w-10 h-10 p-0 border-0 rounded cursor-pointer shrink-0 bg-transparent flex-[0_0_auto] overflow-hidden"
                             style={{
                               WebkitAppearance: "none",
                               padding: 0,
                               border: "none",
                             }}
                           />
                           <input 
                             type="text"
                             value={customProps[key]} 
                             onChange={(e) => handlePropChange(key, e.target.value)}
                             className="w-full bg-transparent border-0 px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:ring-0 uppercase placeholder-muted-foreground"
                             placeholder="#000000"
                           />
                         </div>
                       )}
                     </div>
                   ))}
                 </div>
              </div>
            )}

            {/* API Reference Table */}
            {component.props && Object.keys(component.props).length > 0 && (
              <div className="border border-foreground/10 rounded-2xl bg-background overflow-hidden">
                 <div className="p-6 pb-4">
                   <h3 className="text-sm font-bold flex items-center gap-2">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
                     API Reference
                   </h3>
                 </div>
                 <div className="overflow-x-auto">
                   <table className="w-full text-sm">
                     <thead>
                       <tr className="border-t border-foreground/5 bg-foreground/[0.02]">
                         <th className="text-left px-6 py-3 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Prop</th>
                         <th className="text-left px-6 py-3 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Type</th>
                         <th className="text-left px-6 py-3 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Default</th>
                         <th className="text-left px-6 py-3 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Description</th>
                       </tr>
                     </thead>
                     <tbody>
                       {Object.entries(component.props).map(([key, propDef], i) => (
                         <tr key={key} className={`border-t border-foreground/5 ${i % 2 === 0 ? '' : 'bg-foreground/[0.015]'}`}>
                           <td className="px-6 py-3 font-mono text-xs font-semibold text-foreground">{key}</td>
                           <td className="px-6 py-3">
                             {propDef.type === "select" && propDef.options ? (
                               <span className="font-mono text-xs text-purple-500 dark:text-purple-400">{propDef.options.map(o => `"${o}"`).join(" | ")}</span>
                             ) : (
                               <span className="font-mono text-xs text-blue-500 dark:text-blue-400">{propDef.type}</span>
                             )}
                           </td>
                           <td className="px-6 py-3 font-mono text-xs text-muted-foreground">{typeof propDef.defaultValue === "boolean" ? String(propDef.defaultValue) : `"${propDef.defaultValue}"`}</td>
                           <td className="px-6 py-3 text-xs text-muted-foreground">{propDef.description || "—"}</td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
              </div>
            )}
          </div>
        )}

        {/* Playground Tab */}
        {activeTab === "playground" && (
          <div className="relative border border-foreground/10 rounded-2xl overflow-hidden bg-background">
             <SandpackProvider 
               template="react-ts" 
               theme={theme === 'dark' ? 'dark' : 'light'}
               files={{
                 "/App.tsx": `import { ${component.name} } from "./${component.name}";
import "./styles.css";

export default function App() {
  return (
    <div className="flex h-screen items-center justify-center">
      <${component.name} {...${JSON.stringify(customProps)}} />
    </div>
  );
}`,
                 [`/${component.name}.tsx`]: component.code.ts,
                 "/styles.css": component.code.css,
               }}
               customSetup={{
                 dependencies: {
                   "lucide-react": "^0.300.0",
                   "framer-motion": "^12.0.0",
                   "motion-dom": "latest",
                   ...(component.intelligence?.dependencies?.reduce((acc: any, dep) => ({...acc, [dep]: "latest"}), {}) || {})
                 }
               }}
               options={{
                 bundlerURL: "https://sandpack-bundler.codesandbox.io"
               }}
             >
               <SandpackLayout className="!rounded-none !border-none flex-col md:flex-row !h-auto md:!h-[500px]">
                 <SandpackCodeEditor showTabs={true} showLineNumbers={true} showRunButton={false} className="!h-[500px]" />
                 <SandpackPreview showRefreshButton={true} showOpenInCodeSandbox={false} className="!h-[500px] border-t md:border-t-0 md:border-l border-foreground/10" />
               </SandpackLayout>
             </SandpackProvider>
          </div>
        )}

        {/* Code Tab */}
        {activeTab === "code" && (
          <div>
           {/* Smart Install System */}
           <section className="mb-12">
             <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">Smart Install</h2>
             
             <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
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
              
              <div className="flex items-center gap-2">
                 <div className="relative">
                   <select 
                     value={framework}
                     onChange={(e) => setFramework(e.target.value as any)}
                     className="bg-transparent border border-foreground/10 rounded-full px-4 py-1.5 text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 appearance-none outline-none cursor-pointer pr-8"
                   >
                     <option value="next" className="bg-background text-foreground">Next.js</option>
                     <option value="vite" className="bg-background text-foreground">Vite</option>
                     <option value="remix" className="bg-background text-foreground">Remix</option>
                   </select>
                   <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                     <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                   </div>
                 </div>
                 
                 {installTab === "cli" && (
                   <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-foreground/10 text-foreground transition-colors text-xs font-medium bg-transparent cursor-default select-none">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="m19.01 11.55-7.46 7.46c-.46.46-.46 1.19 0 1.65a1.16 1.16 0 0 0 1.64 0l7.46-7.46c.46-.46.46-1.19 0-1.65s-1.19-.46-1.65 0ZM19.17 3.34c-.46-.46-1.19-.46-1.65 0L3.34 17.52c-.46.46-.46 1.19 0 1.65a1.16 1.16 0 0 0 1.64 0L19.16 4.99c.46-.46.46-1.19 0-1.65Z"/></svg>
                      <span className="text-muted-foreground tracking-wide">mintuix</span>
                   </div>
                 )}
              </div>
           </div>

           <div className="border border-foreground/10 rounded-xl overflow-hidden bg-background">
              <div className="flex items-center gap-6 px-4 py-3 border-b border-foreground/5 text-xs font-mono text-muted-foreground select-none overflow-x-auto">
                 {["pnpm", "npm", "yarn", "bun"].map((pm) => (
                   <span 
                     key={pm}
                     onClick={() => setPackageManager(pm as any)}
                     className={`cursor-pointer transition-colors font-semibold ${packageManager === pm ? "text-primary" : "hover:text-foreground"}`}
                   >
                     {pm}
                   </span>
                 ))}
              </div>
              <div className="relative group">
                {(() => {
                  let installString = "";
                  
                  if (!component.variants && component.install) {
                    if (installTab === "cli") {
                      let runner = "npx";
                      if (packageManager === "pnpm") runner = "pnpm dlx";
                      if (packageManager === "yarn") runner = "yarn dlx";
                      if (packageManager === "bun") runner = "bunx";
                      
                      const baseCmd = `npx mintuix add ${component.slug}`;
                      installString = baseCmd.replace("npx", runner) + (framework !== "next" ? ` --${framework}` : "");
                    } else {
                      let installer = "npm install";
                      if (packageManager === "pnpm") installer = "pnpm add";
                      if (packageManager === "yarn") installer = "yarn add";
                      if (packageManager === "bun") installer = "bun install";
                      installString = `${installer} ${component.install?.npm?.split('install ')[1] || `@mintuix/${component.slug}`}`;
                    }
                  } else {
                    const variantKey: VariantKey = `${codeLang}-${codeStyle}` as VariantKey;
                    installString = generateInstallCommand(
                      component.slug,
                      variantKey,
                      packageManager,
                      installTab,
                      component.intelligence?.registryDependencies
                    );
                  }

                  return (
                    <>
                      <pre className="p-4 md:p-6 text-zinc-300 overflow-x-auto text-sm font-mono leading-relaxed bg-[#0d0d0d]">
                        <code>{installString}</code>
                      </pre>
                      <button 
                        onClick={() => handleCopy(installString, 'install')}
                        className="absolute top-4 right-4 p-2 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors opacity-0 group-hover:opacity-100 flex items-center gap-2 text-xs font-sans"
                      >
                        {copied === 'install' ? (
                          <><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"/></svg> Copied</>
                        ) : (
                          <><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> Copy</>
                        )}
                      </button>
                    </>
                  );
                })()}
              </div>
           </div>
      </section>

      {/* Usage Section */}
      {component.usage && (
        <section className="pt-8 mb-12 border-t border-foreground/5">
          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">Usage</h2>
          
          <div className="flex items-center gap-3 mb-4">
            {/* Language Combobox for Usage */}
            <div className="relative">
              <button 
                onClick={() => {
                  setIsLangDropdownOpen(!isLangDropdownOpen);
                  setIsStyleDropdownOpen(false);
                }}
                className="flex items-center gap-2 bg-[#0d0d0d] border border-foreground/10 hover:border-foreground/20 transition-colors rounded-xl py-2 px-3 focus:outline-none"
              >
                <span className="font-bold text-[11px] text-zinc-100">{codeLang === 'ts' ? 'TS' : 'JS'}</span>
                <span className="text-sm font-medium text-zinc-300">{codeLang === 'ts' ? 'TypeScript' : 'JavaScript'}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-zinc-500 transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
              </button>
              
              {isLangDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsLangDropdownOpen(false)}></div>
                  <div className="absolute top-full left-0 mt-2 w-max min-w-[140px] bg-[#0d0d0d] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 flex flex-col p-1.5">
                    <button 
                      onClick={() => { setCodeLang('ts'); setIsLangDropdownOpen(false); }}
                      className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors group ${codeLang === 'ts' ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                    >
                      <span className="font-bold text-[11px] mr-2 text-zinc-100">TS</span>
                      <span className="font-medium">TypeScript</span>
                      {codeLang === 'ts' && <div className="ml-auto w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]"></div>}
                    </button>
                    <button 
                      onClick={() => { setCodeLang('js'); setIsLangDropdownOpen(false); }}
                      className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors group mt-0.5 ${codeLang === 'js' ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                    >
                      <span className="font-bold text-[11px] mr-2 text-zinc-100">JS</span>
                      <span className="font-medium">JavaScript</span>
                      {codeLang === 'js' && <div className="ml-auto w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]"></div>}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="relative border border-foreground/10 rounded-2xl overflow-hidden bg-[#0d0d0d] flex flex-col group">
            {/* Copy Button */}
            {(() => {
              const usageCode = codeLang === "ts" ? component.usage.ts : component.usage.js;
              return (
                <button 
                  onClick={() => handleCopy(usageCode, 'usage')}
                  className="absolute top-4 right-4 p-2 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 z-20 border border-white/10"
                  title="Copy code"
                >
                  {copied === 'usage' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                  )}
                </button>
              );
            })()}

            {/* Code Content */}
            <div className="relative">
              <div className="p-4 sm:p-6 text-zinc-300 overflow-x-auto text-[13px] font-mono leading-relaxed scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <CodeHighlighter 
                  code={codeLang === "ts" ? component.usage.ts : component.usage.js} 
                  lang={codeLang} 
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Code Section */}
      <section className="pt-8 mb-12 border-t border-foreground/5">
        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">Code</h2>
        
        <div className="flex items-center gap-3 mb-4">
          
          {/* Language Combobox */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsLangDropdownOpen(!isLangDropdownOpen);
                setIsStyleDropdownOpen(false);
              }}
              className="flex items-center gap-2 bg-[#0d0d0d] border border-foreground/10 hover:border-foreground/20 transition-colors rounded-xl py-2 px-3 focus:outline-none"
            >
              <span className="font-bold text-[11px] text-zinc-100">{codeLang === 'ts' ? 'TS' : 'JS'}</span>
              <span className="text-sm font-medium text-zinc-300">{codeLang === 'ts' ? 'TypeScript' : 'JavaScript'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-zinc-500 transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
            </button>
            
            {isLangDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsLangDropdownOpen(false)}></div>
                <div className="absolute top-full left-0 mt-2 w-max min-w-[140px] bg-[#0d0d0d] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 flex flex-col p-1.5">
                  <button 
                    onClick={() => { setCodeLang('ts'); setIsLangDropdownOpen(false); }}
                    className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors group ${codeLang === 'ts' ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                  >
                    <span className="font-bold text-[11px] mr-2 text-zinc-100">TS</span>
                    <span className="font-medium">TypeScript</span>
                    {codeLang === 'ts' && <div className="ml-auto w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]"></div>}
                  </button>
                  <button 
                    onClick={() => { setCodeLang('js'); setIsLangDropdownOpen(false); }}
                    className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors group mt-0.5 ${codeLang === 'js' ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                  >
                    <span className="font-bold text-[11px] mr-2 text-zinc-100">JS</span>
                    <span className="font-medium">JavaScript</span>
                    {codeLang === 'js' && <div className="ml-auto w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]"></div>}
                  </button>
                </div>
              </>
            )}
          </div>
          
          {/* Style Combobox */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsStyleDropdownOpen(!isStyleDropdownOpen);
                setIsLangDropdownOpen(false);
              }}
              className="flex items-center gap-2 bg-[#0d0d0d] border border-foreground/10 hover:border-foreground/20 transition-colors rounded-xl py-2 px-3 focus:outline-none"
            >
              {codeStyle === "tailwind" ? (
                <svg fill="currentColor" width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-zinc-100"><path fillRule="evenodd" clipRule="evenodd" d="M12 6.036c-2.667 0-4.333 1.325-5 3.976 1-1.325 2.167-1.822 3.5-1.491.761.189 1.305.738 1.906 1.345C13.387 10.855 14.522 12 17 12c2.667 0 4.333-1.325 5-3.976-1 1.325-2.166 1.822-3.5 1.491-.761-.189-1.305-.738-1.907-1.345-.98-.99-2.114-2.134-4.593-2.134zM7 12c-2.667 0-4.333 1.325-5 3.976 1-1.326 2.167-1.822 3.5-1.491.761.189 1.305.738 1.907 1.345.98.989 2.115 2.134 4.594 2.134 2.667 0 4.333-1.325 5-3.976-1 1.325-2.167 1.822-3.5 1.491-.761-.189-1.305-.738-1.906-1.345C10.613 13.145 9.478 12 7 12z"></path></svg>
              ) : codeStyle === "variants" ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-100"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
              ) : null}
              <span className="text-sm font-medium text-zinc-300">{codeStyle === 'tailwind' ? 'Tailwind' : 'Variants'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-zinc-500 transition-transform ${isStyleDropdownOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
            </button>
            
            {isStyleDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsStyleDropdownOpen(false)}></div>
                <div className="absolute top-full left-0 mt-2 w-max min-w-[140px] bg-[#0d0d0d] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 flex flex-col p-1.5">
                  <button 
                    onClick={() => { setCodeStyle('tailwind'); setIsStyleDropdownOpen(false); }}
                    className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors group ${codeStyle === 'tailwind' ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                  >
                    <svg className="mr-2 text-zinc-100" fill="currentColor" width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12 6.036c-2.667 0-4.333 1.325-5 3.976 1-1.325 2.167-1.822 3.5-1.491.761.189 1.305.738 1.906 1.345C13.387 10.855 14.522 12 17 12c2.667 0 4.333-1.325 5-3.976-1 1.325-2.166 1.822-3.5 1.491-.761-.189-1.305-.738-1.907-1.345-.98-.99-2.114-2.134-4.593-2.134zM7 12c-2.667 0-4.333 1.325-5 3.976 1-1.326 2.167-1.822 3.5-1.491.761.189 1.305.738 1.907 1.345.98.989 2.115 2.134 4.594 2.134 2.667 0 4.333-1.325 5-3.976-1 1.325-2.167 1.822-3.5 1.491-.761-.189-1.305-.738-1.906-1.345C10.613 13.145 9.478 12 7 12z"></path></svg>
                    <span className="font-medium">Tailwind</span>
                    {codeStyle === 'tailwind' && <div className="ml-auto w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]"></div>}
                  </button>
                  <button 
                    onClick={() => { setCodeStyle('variants'); setIsStyleDropdownOpen(false); }}
                    className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors group mt-0.5 ${codeStyle === 'variants' ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                  >
                    <svg className="mr-2 text-zinc-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
                    <span className="font-medium">Variants</span>
                    {codeStyle === 'variants' && <div className="ml-auto w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.5)]"></div>}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="relative border border-foreground/10 rounded-2xl overflow-hidden bg-[#0d0d0d] flex flex-col group">
          
          {/* Copy Button */}
          {(() => {
            const activeCode = codeStyle === "variants" 
              ? (component.usage?.[codeLang] || component.code[codeLang])
              : component.code[codeLang] || component.code.ts;
            return (
              <button 
                onClick={() => handleCopy(activeCode, 'code')}
                className="absolute top-4 right-4 p-2 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 z-20 border border-white/10"
                title="Copy code"
              >
                {copied === 'code' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                )}
              </button>
            );
          })()}

          {/* Code Content */}
          <div className={`relative ${!isCodeExpanded ? "max-h-[400px] overflow-hidden" : ""}`}>
            <div className="p-4 sm:p-6 text-zinc-300 overflow-x-auto text-[13px] font-mono leading-relaxed scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
               <CodeHighlighter 
                 code={codeStyle === "variants" 
                   ? (component.usage?.[codeLang] || component.code[codeLang])
                   : component.code[codeLang] || component.code.ts} 
                 lang={codeLang} 
               />
            </div>
            {!isCodeExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d0d0d] to-transparent pointer-events-none flex items-end justify-center pb-6">
                <button 
                  onClick={() => setIsCodeExpanded(true)}
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md transition-colors border border-white/10 pointer-events-auto shadow-xl"
                >
                  Expand Snippet
                </button>
              </div>
            )}
            {isCodeExpanded && (
              <div className="flex justify-center p-4 border-t border-white/10 bg-[#0d0d0d] relative z-10">
                <button 
                  onClick={() => setIsCodeExpanded(false)}
                  className="px-4 py-2 rounded-full text-white/50 hover:text-white text-xs font-semibold transition-colors"
                >
                  Collapse Snippet
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Intelligence / Dependencies Panel */}
        <div className="relative w-full rounded-2xl border border-foreground/10 bg-background/50 overflow-hidden mt-4">
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none z-10 transition-opacity"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none z-10 transition-opacity"></div>

            <div className="flex items-center gap-8 p-5 overflow-x-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-foreground/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-foreground/20">
              
              <div className="flex-shrink-0 space-y-2">
                <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold block">Dependencies ({component.intelligence?.dependencies?.length ?? 0})</span>
                <div className="flex items-center gap-2">
                  {component.intelligence?.dependencies?.map(dep => (
                    <span key={dep} className="text-xs font-mono px-2 py-1.5 rounded-lg bg-foreground/5 text-foreground border border-foreground/10">{dep}</span>
                  ))}
                  {(!component.intelligence?.dependencies || component.intelligence.dependencies.length === 0) && (
                    <span className="text-xs text-muted-foreground italic">None</span>
                  )}
                </div>
              </div>

              <div className="w-px h-10 bg-foreground/10 flex-shrink-0 hidden md:block"></div>

              <div className="flex items-center gap-3 flex-shrink-0 opacity-100 transition-opacity">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${component.intelligence?.isSsrSafe ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                  {component.intelligence?.isSsrSafe ? (
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : (
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  )}
                </div>
                <div>
                  <span className="block text-sm font-bold text-foreground leading-tight">SSR Safe</span>
                  <span className="block text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{component.intelligence?.isSsrSafe ? 'Server-Side Render' : 'Client Only'}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${component.intelligence?.isRscReady ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                  {component.intelligence?.isRscReady ? (
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : (
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  )}
                </div>
                <div>
                  <span className="block text-sm font-bold text-foreground leading-tight">RSC Ready</span>
                  <span className="block text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{component.intelligence?.isRscReady ? 'React Server Component' : 'Client Component'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0 pr-8">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${component.intelligence?.isAccessible ? 'bg-green-500/10' : 'bg-amber-500/10'}`}>
                  {component.intelligence?.isAccessible ? (
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : (
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  )}
                </div>
                <div>
                  <span className="block text-sm font-bold text-foreground leading-tight">{component.intelligence?.isAccessible ? 'Accessible' : 'A11y Warning'}</span>
                  <span className="block text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{component.intelligence?.isAccessible ? 'A11y Compliant' : 'Review Required'}</span>
                </div>
              </div>

            </div>
          </div>
        </section>
          </div>
        )}
      </div>
    </div>
  );
}