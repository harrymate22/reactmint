export default function DocsIndex() {
  return (
    <div className="space-y-10 lg:space-y-12 pb-16">
      <section>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
          Introduction
        </h1>
        <div className="text-muted-foreground text-base md:text-lg leading-relaxed space-y-6">
          <p>
            ReactMint is an open-source collection of carefully designed UI components that aim to enhance your React web applications.
          </p>
          <p>
            This is not your typical component library, which means you won't find a set of generic buttons, inputs, or other common UI elements here.
          </p>
          <p>
            Basically, these components are here to help you stand out and make a statement visually by adding a touch of creativity to your projects.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
          Mission
        </h2>
        <div className="text-muted-foreground text-base md:text-lg leading-relaxed space-y-6">
          <p>
            The goal of ReactMint is simple - provide flexible, visually stunning and most importantly, free components that take web projects to the next level.
          </p>
          <p>
            To make that happen, the project is committed to the following principles:
          </p>
          
          <ul className="space-y-4 mt-8 list-none pl-0">
             <li className="flex items-start gap-3">
               <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0"></span>
               <div>
                  <strong className="text-foreground font-semibold">Free For All:</strong> You own the code, and it's free to use in your projects.
               </div>
             </li>
             <li className="flex items-start gap-3">
               <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0"></span>
               <div>
                  <strong className="text-foreground font-semibold">Prop-First Approach:</strong> Easy customization through thoughtfully exposed props.
               </div>
             </li>
             <li className="flex items-start gap-3">
               <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0"></span>
               <div>
                  <strong className="text-foreground font-semibold">Fully Modular:</strong> Install strictly what you need, ReactMint is not a dependency nightmare.
               </div>
             </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
