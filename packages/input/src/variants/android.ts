import type { InputVariant, InputSize } from "../Input";

export const androidStyles: Record<string, string> = {
  wrapper: "relative flex flex-col",
  base: "w-full bg-transparent border-b-2 border-[#79747e] dark:border-[#938f99] px-3 text-[16px] font-normal text-[#1d1b20] dark:text-[#e6e0e9] placeholder:text-[#49454f] dark:placeholder:text-[#938f99] focus:outline-none focus:border-[#6750a4] dark:focus:border-[#d0bcff] transition-colors duration-200 rounded-t-md bg-[#e7e0ec]/30 dark:bg-[#36343b]/30",
  label: "text-[12px] font-normal text-[#49454f] dark:text-[#cac4d0] mb-1",
  floatingLabel: "absolute left-3 text-[#49454f] dark:text-[#cac4d0] pointer-events-none transition-all duration-200 ease-out",
  floatingLabelIdle: "top-1/2 -translate-y-1/2 text-[16px]",
  floatingLabelActive: "top-1.5 -translate-y-0 text-[12px] text-[#6750a4] dark:text-[#d0bcff]",
  error: "text-[12px] text-[#b3261e] dark:text-[#f2b8b5] mt-1 font-normal",
  errorBorder: "border-[#b3261e] dark:border-[#f2b8b5] focus:border-[#b3261e] dark:focus:border-[#f2b8b5]",
  sm: "h-10 text-[14px]",
  md: "h-[52px] text-[16px]",
  lg: "h-[60px] text-[18px]",
  floatingPadding: "pt-5 pb-1",
};
