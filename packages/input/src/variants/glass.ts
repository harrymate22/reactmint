import type { InputVariant, InputSize } from "../Input";

export const glassStyles: Record<string, string> = {
  wrapper: "relative flex flex-col",
  base: "w-full bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl px-5 text-[16px] font-medium text-white placeholder:text-white/40 border border-white/20 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
  label: "text-[13px] font-semibold text-white/60 mb-2 tracking-wider uppercase",
  floatingLabel: "absolute left-5 text-white/40 pointer-events-none transition-all duration-300 ease-out",
  floatingLabelIdle: "top-1/2 -translate-y-1/2 text-[16px]",
  floatingLabelActive: "top-2 -translate-y-0 text-[11px] font-semibold uppercase tracking-wider text-white/70",
  error: "text-[13px] text-red-300 mt-1.5 font-medium",
  errorBorder: "border-red-400/50 focus:ring-red-400/30",
  sm: "h-10 text-[14px]",
  md: "h-12 text-[16px]",
  lg: "h-14 text-[18px]",
  floatingPadding: "pt-5 pb-1",
};
