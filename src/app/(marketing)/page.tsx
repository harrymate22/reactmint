import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { FrameworkCombobox } from "@/components/marketing/FrameworkCombobox";
import { ArrowRight, Star, Settings, Box, Menu, Check } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function MarketingPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-primary/30 bg-background text-foreground relative overflow-hidden">
      

      <div className="absolute inset-0 pointer-events-none z-0">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Floating Navigation Header */}
      <header className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl rounded-full bg-background/60 backdrop-blur-xl border border-foreground/10 px-6 py-3 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-4 shrink-0">
           <Link href="/" className="flex items-center gap-2">
             <div className="h-6 w-6 rounded-md bg-foreground flex items-center justify-center shadow-[0_0_10px_rgba(255,65,3,0.2)] dark:shadow-[0_0_10px_rgba(255,65,3,0.5)]">
               <span className="text-background font-extrabold text-[10px]">RM</span>
             </div>
             <span className="font-bold tracking-tight text-foreground/90 text-sm hidden lg:block">ReactMint</span>
           </Link>
           
           {/* Promo Pill */}
           <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-semibold tracking-wide">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>
              <span>ReactMint Pro is here - <span className="opacity-80">100+ UI blocks</span></span>
           </div>
        </div>
        
        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
           <Link href="/" className="px-4 py-1.5 rounded-full text-sm font-medium text-foreground bg-foreground/10">Home <span className="absolute w-1 h-1 bg-foreground rounded-full bottom-1 left-1/2 -translate-x-1/2 shadow-[0_0_5px_currentColor]"></span></Link>
           <Link href="/docs" className="px-4 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors">Docs</Link>
           <Link href="/showcase" className="px-4 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors">Showcase</Link>
           <Link href="/tools" className="px-4 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors">Tools</Link>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
           <Link href="https://github.com/harrymate22" target="_blank" className="hidden sm:flex items-center gap-2 text-xs font-semibold rounded-full bg-primary hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(255,65,3,0.4)] py-1.5 pl-3 pr-1.5 text-white">
              Star On GitHub
              <div className="bg-black/40 rounded-full px-1.5 py-0.5 flex items-center gap-1">
                <Star className="w-3 h-3 fill-white" /> 36.3K
              </div>
           </Link>
           <ModeToggle />
           <button className="md:hidden p-1.5 text-muted-foreground hover:text-foreground"><Menu className="w-5 h-5"/></button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto flex flex-col items-center pt-48 pb-32 px-6">
        
        {/* Massive Glowing Core Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[800px] pointer-events-none flex justify-center opacity-70">
           <div className="absolute top-20 w-[600px] h-[400px] bg-primary/20 blur-[130px] rounded-full mix-blend-normal dark:mix-blend-screen" />
           <div className="absolute top-40 w-[400px] h-[500px] bg-secondary/30 blur-[150px] rounded-full mix-blend-normal dark:mix-blend-screen translate-x-20" />
        </div>

        {/* Hero Content */}
        <section className="relative z-10 flex flex-col items-center text-center max-w-4xl mb-32">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold mb-8 backdrop-blur-md">
             <span className="bg-primary text-white px-1.5 py-0.5 rounded uppercase tracking-wider text-[9px]">New</span> Premium Components <ArrowRight className="w-3 h-3"/>
           </div>
           
           <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-foreground leading-[1.05] drop-shadow-sm dark:drop-shadow-2xl">
              React Components<br/>
              For Creative Developers
           </h1>
           
           <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl font-medium leading-relaxed">
             Highly customizable animated components that make<br className="hidden md:block"/> your React projects truly stand out.
           </p>
           
           <div className="mt-12">
             <Link href="/docs" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-white font-bold text-lg hover:bg-primary/90 hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,65,3,0.5)]">
               Browse Components
             </Link>
           </div>
        </section>

        {/* Built for Shipping Stats */}
        <section className="w-full mb-32 relative z-10 flex flex-col items-center">
           <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Built for Shipping</h2>
           <p className="text-muted-foreground mb-12">Your next masterpiece is just a copy-paste away.</p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
              <div className="col-span-1 md:col-span-2 bg-zinc-50 dark:bg-[#001018] border border-foreground/5 rounded-3xl p-8 shadow-xl flex flex-col justify-center min-h-[180px] hover:border-foreground/10 transition-colors">
                 <div className="text-5xl md:text-7xl font-extrabold text-foreground mb-2 tracking-tight">110<span className="text-primary">+</span></div>
                 <h3 className="text-foreground font-bold text-lg">Creative Components</h3>
                 <p className="text-muted-foreground text-sm">Growing continually.</p>
              </div>
              
              <div className="col-span-1 bg-zinc-50 dark:bg-[#001018] border border-foreground/5 rounded-3xl p-8 shadow-xl flex flex-col justify-center min-h-[180px] hover:border-foreground/10 transition-colors">
                 <div className="p-4 flex items-center justify-center h-full">
                   <div className="w-full max-w-[200px] border border-foreground/10 rounded-xl bg-foreground/5 p-3 relative overflow-hidden">
                     <div className="absolute inset-0 bg-primary/5"></div>
                     <div className="h-2 w-1/2 bg-foreground/20 rounded mb-2"></div>
                     <div className="h-2 w-full bg-foreground/10 rounded mb-2"></div>
                     <div className="h-8 w-full bg-primary/20 rounded mt-4 border border-primary/30"></div>
                   </div>
                 </div>
              </div>

              <div className="bg-zinc-50 dark:bg-[#001018] border border-foreground/5 rounded-3xl p-8 shadow-xl hover:border-foreground/10 transition-colors">
                 <div className="text-5xl font-extrabold text-primary mb-2 tracking-tight">4</div>
                 <h3 className="text-foreground font-bold">Variants</h3>
                 <p className="text-muted-foreground text-sm">For every component.</p>
              </div>

              <div className="bg-zinc-50 dark:bg-[#001018] border border-foreground/5 rounded-3xl p-8 shadow-xl hover:border-foreground/10 transition-colors">
                 <div className="text-5xl font-extrabold text-primary mb-2 tracking-tight">100%</div>
                 <h3 className="text-foreground font-bold">Free & Open Source</h3>
                 <p className="text-muted-foreground text-sm">Loved by devs worldwide.</p>
              </div>

              <div className="bg-zinc-50 dark:bg-[#001018] border border-foreground/5 rounded-3xl p-8 shadow-xl hover:border-foreground/10 transition-colors">
                 <div className="text-5xl font-extrabold text-primary mb-2 tracking-tight">3</div>
                 <h3 className="text-foreground font-bold">Tools</h3>
                 <p className="text-muted-foreground text-sm">Boost your workflow.</p>
              </div>
           </div>
        </section>

        {/* Tools Section */}
        <section className="w-full mb-32 relative z-10 flex flex-col items-center">
           <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Tools</h2>
           <p className="text-muted-foreground mb-12">Free utilities to boost your workflow.</p>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
              {[
                { title: "Background Studio", desc: "Explore a curated list of generated backgrounds that easily drop into your projects.", icon: "bg" },
                { title: "Shape Magic", desc: "Create and easily tweak blob shapes for organic looking borders and masks.", icon: "sh" },
                { title: "Texture Lab", desc: "Add depth and character to your designs with generated noise and grains.", icon: "tx" }
              ].map((tool, i) => (
                <div key={i} className="bg-zinc-50 dark:bg-[#001018] border border-foreground/5 rounded-3xl p-6 hover:border-primary/50 transition-all group cursor-pointer relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors"></div>
                  <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-xs mb-6 mx-auto md:mx-0">
                    {tool.icon}
                  </div>
                  <h3 className="text-foreground font-bold text-lg mb-3">{tool.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {tool.desc}
                  </p>
                  <div className="text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                    Try it out <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
           </div>
        </section>



        {/* Global CTA Banner Footer */}
        <section className="w-full max-w-5xl mt-16 relative">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-[3rem] -z-10"></div>
          <div className="w-full bg-gradient-to-br from-primary via-[#e03902] to-secondary rounded-[3rem] p-12 md:p-20 flex flex-col items-center text-center shadow-2xl border border-white/20 relative overflow-hidden">
             
             {/* Micro-texture over gradient */}
            {/* Noise overlay removed */}
             
             <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 relative z-10">
               Start Exploring
             </h2>
             <p className="text-white/80 text-lg mb-10 font-medium relative z-10">
               Animations, Components, Backgrounds - One Click Away.
             </p>
             <Link href="/docs" className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-xl relative z-10">
               Browse Components
             </Link>
          </div>
        </section>

      </main>

      {/* Minimal Footer Signature */}
      <footer className="w-full py-8 border-t border-foreground/5 flex flex-col md:flex-row items-center justify-between px-6 max-w-6xl mx-auto text-xs text-muted-foreground font-medium">
         <div className="flex items-center gap-2 mb-4 md:mb-0">
           <div className="w-4 h-4 rounded bg-foreground/10 flex items-center justify-center text-foreground"><span className="text-[8px] font-bold">RM</span></div>
           ReactMint © 2026
         </div>
         <div className="flex gap-6">
           <Link href="/" className="hover:text-foreground transition-colors">Twitter</Link>
           <Link href="/" className="hover:text-foreground transition-colors">GitHub</Link>
           <Link href="/" className="hover:text-foreground transition-colors">Email</Link>
           <Link href="/" className="hover:text-foreground transition-colors">Sponsors</Link>
         </div>
      </footer>

    </div>
  );
}
