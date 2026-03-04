import type { InputVariant, InputSize } from "../Input";

export const glassStyles: Record<string, string> = {
  wrapper: "glass-effect flex flex-col rounded-2xl transition-transform duration-300 focus-within:scale-[1.02]",
  base: "w-full bg-transparent px-5 text-[16px] font-medium text-zinc-900 dark:text-white placeholder:text-zinc-500/50 dark:placeholder:text-white/40 border-none focus:outline-none focus:ring-0 transition-all duration-300",
  label: "text-[13px] font-bold text-zinc-600 dark:text-white/60 mb-2 tracking-wider uppercase px-1",
  floatingLabel: "absolute left-5 text-zinc-500/80 dark:text-white/50 pointer-events-none transition-all duration-300 ease-out",
  floatingLabelIdle: "top-1/2 -translate-y-1/2 text-[16px]",
  floatingLabelActive: "top-2 -translate-y-0 text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-white/80",
  error: "text-[13px] text-red-500 dark:text-red-300 mt-1.5 font-medium px-1",
  errorBorder: "!shadow-[inset_0_0_0_1px_rgba(239,68,68,1)] dark:!shadow-[inset_0_0_0_1px_rgba(248,113,113,0.5)]",
  sm: "h-11 text-[14px]",
  md: "h-14 text-[16px]",
  lg: "h-16 text-[18px]",
  floatingPadding: "pt-6 pb-2",
};
