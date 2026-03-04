import type { InputVariant, InputSize } from "../Input";

export const androidStyles: Record<string, string> = {
  wrapper: "relative flex flex-col",
  base: "w-full bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200/80 dark:hover:bg-zinc-800 rounded-t-xl border-b-[1.5px] border-zinc-400 dark:border-zinc-500 px-4 text-[16px] font-normal text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-b-2 focus:border-[var(--input-focus-color,#6750a4)] dark:focus:border-[var(--input-focus-color,#d0bcff)] transition-all duration-200",
  label: "text-[12px] font-medium text-zinc-600 dark:text-zinc-400 mb-1",
  floatingLabel: "absolute left-4 text-zinc-600 dark:text-zinc-400 pointer-events-none transition-all duration-200 ease-out",
  floatingLabelIdle: "top-1/2 -translate-y-1/2 text-[16px]",
  floatingLabelActive: "top-[6px] -translate-y-0 text-[12px] font-medium text-[var(--input-focus-color,#6750a4)] dark:text-[var(--input-focus-color,#d0bcff)]",
  error: "text-[12px] text-red-600 dark:text-red-400 mt-1.5 font-medium px-4",
  errorBorder: "border-red-600 dark:border-red-400 focus:border-red-600 dark:focus:border-red-400 text-red-900 dark:text-red-100",
  sm: "h-11 text-[14px]",
  md: "h-[56px] text-[16px]",
  lg: "h-[64px] text-[18px]",
  floatingPadding: "pt-6 pb-2",
};
