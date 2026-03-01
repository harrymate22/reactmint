import { ReactNode } from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Star, Menu, Search, Rocket } from "lucide-react";
import { componentsList } from "@/content/components";
import { Input } from "@/components/ui/input";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-primary/30 bg-background text-foreground bg-[url('https://reactbits.dev/noise.png')] bg-fixed mix-blend-normal dark:mix-blend-lighten [background-size:200px]">
      
      {/* Docs Header Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-foreground/10 bg-background/80 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4 md:px-6 lg:px-8 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-foreground flex items-center justify-center shadow-[0_0_10px_rgba(255,65,3,0.3)]">
                <span className="text-background font-extrabold text-[10px]">RM</span>
              </div>
              <span className="font-bold tracking-tight text-foreground/90 text-sm hidden md:block">ReactMint</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Bar */}
            <div className="hidden sm:flex items-center relative w-48 lg:w-64">
              <Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-12 h-9 bg-foreground/5 border-foreground/10 hover:border-foreground/20 focus-visible:ring-primary/20 transition-colors rounded-full text-xs"
              />
              <span className="absolute right-3 bg-foreground/10 rounded px-1.5 py-0.5 text-[10px] font-mono border border-foreground/10 text-muted-foreground">/</span>
            </div>

            <Link href="https://github.com/harrymate22" target="_blank" className="hidden sm:flex items-center gap-2 text-xs font-semibold rounded-full bg-primary hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(255,65,3,0.4)] py-1.5 pl-3 pr-1.5 text-white">
               Star On GitHub
               <div className="bg-black/40 rounded-full px-1.5 py-0.5 flex items-center gap-1">
                 <Star className="w-3 h-3 fill-white" /> 36.3K
               </div>
            </Link>
            
            <ModeToggle />
            <button className="md:hidden p-1.5 text-muted-foreground hover:text-foreground"><Menu className="w-5 h-5"/></button>
          </div>
        </div>
      </header>

      {/* Main 3-Column Layout Container */}
      <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)_260px] xl:grid-cols-[260px_minmax(0,1fr)_280px] md:gap-6 lg:gap-10">
        
        {/* Left Sidebar (Navigation) */}
        <aside className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-full shrink-0 md:sticky md:block overflow-y-auto py-8 pr-6 border-r border-foreground/5 scrollbar-thin scrollbar-thumb-foreground/10">
          
          {/* Get Started */}
          <div className="mb-8">
            <h4 className="mb-3 px-2 text-sm font-medium text-foreground">Get Started</h4>
            <div className="grid grid-flow-row auto-rows-max text-sm space-y-1 border-l border-foreground/10 ml-2">
              <Link href="/docs" className="flex w-full items-center border-l-2 border-transparent px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors -ml-[1px]">Introduction</Link>
              <Link href="#" className="flex w-full items-center border-l-2 border-transparent px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors -ml-[1px]">Installation</Link>
              <Link href="#" className="flex w-full items-center border-l-2 border-transparent px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors -ml-[1px]">MCP</Link>
              <Link href="#" className="flex w-full items-center border-l-2 border-transparent px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors -ml-[1px]">Index</Link>
            </div>
          </div>

          {/* Tools */}
          <div className="mb-8">
            <h4 className="mb-3 px-2 text-sm font-medium text-foreground">Tools</h4>
            <div className="grid grid-flow-row auto-rows-max text-sm space-y-1 border-l border-foreground/10 ml-2">
              <Link href="#" className="flex w-full items-center border-l-2 border-transparent px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors -ml-[1px] gap-2"><div className="w-3 h-3 rounded bg-foreground/10"></div> Background Studio</Link>
              <Link href="#" className="flex w-full items-center border-l-2 border-transparent px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors -ml-[1px] gap-2"><div className="w-3 h-3 rounded bg-foreground/10"></div> Shape Magic</Link>
              <Link href="#" className="flex w-full items-center border-l-2 border-transparent px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors -ml-[1px] gap-2"><div className="w-3 h-3 rounded bg-foreground/10"></div> Texture Lab</Link>
            </div>
          </div>

          {/* Text Animations */}
          <div className="mb-8 pl-1">
            <h4 className="mb-3 px-1 text-sm font-medium text-foreground">Text Animations</h4>
            <div className="grid grid-flow-row auto-rows-max text-sm space-y-1 border-l border-foreground/10 ml-1">
              {componentsList.map((comp) => (
                <Link
                  key={comp.slug}
                  href={`/docs/${comp.slug}`}
                  className="flex w-full items-center border-l-2 border-transparent px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors -ml-[1px]"
                >
                  {comp.name}
                </Link>
              ))}
              <Link href="#" className="flex items-center justify-between w-full border-l-2 border-transparent px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors -ml-[1px]">
                <span>Shiny Text</span>
                <span className="text-[9px] font-bold border border-foreground/10 bg-foreground/5 px-1.5 py-0.5 rounded text-foreground/60 tracking-wider">Updated</span>
              </Link>
              <Link href="#" className="flex items-center justify-between w-full border-l-2 border-transparent px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors -ml-[1px]">
                <span>Gradient Text</span>
                <span className="text-[9px] font-bold border border-foreground/10 bg-foreground/5 px-1.5 py-0.5 rounded text-foreground/60 tracking-wider">Updated</span>
              </Link>
               <Link href="#" className="flex w-full items-center border-l-2 border-transparent px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors -ml-[1px]">Falling Text</Link>
               <Link href="#" className="flex w-full items-center border-l-2 border-transparent px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors -ml-[1px]">Text Cursor</Link>
            </div>
          </div>

          {/* Bottom Fade Mask */}
          <div className="sticky bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none -mb-8"></div>
        </aside>

        {/* Center Main Content */}
        <main className="relative py-8 lg:py-10 min-w-0">
          <div className="mx-auto w-full min-w-0 max-w-3xl prose prose-neutral dark:prose-invert">
             {children}
          </div>
        </main>

        {/* Right Sidebar (Ads / TOC) */}
        <aside className="fixed top-16 z-30 hidden h-[calc(100vh-4rem)] w-full shrink-0 lg:sticky lg:block py-8 pl-4 lg:pl-8 xl:border-l border-foreground/5">
          
          {/* Pro Ad Card */}
          <div className="relative rounded-2xl bg-gradient-to-br from-primary/10 to-orange-600/10 border border-primary/20 p-5 mb-8 overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] -mr-10 -mt-10 transition-all group-hover:bg-primary/30"></div>
            
            <div className="flex items-center gap-2 mb-2 relative z-10">
              <Rocket className="w-5 h-5 text-primary" />
              <h3 className="font-bold tracking-tight text-foreground text-sm">Get ReactMint Pro</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4 relative z-10 font-medium">
              65+ components, 100+ blocks & 5 templates to ship memorable products faster.
            </p>
            <Link href="#" className="block w-full text-center py-2 bg-primary hover:bg-primary/90 transition-colors rounded-xl text-white text-xs font-bold shadow-lg shadow-primary/20 relative z-10">
               Explore Pro &rarr;
            </Link>
          </div>

        </aside>

      </div>
    </div>
  );
}
