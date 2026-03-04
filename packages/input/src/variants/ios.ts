import type { InputVariant, InputSize } from "../Input";

export const iosStyles: Record<string, string> = {
  wrapper: "relative flex flex-col",
  base: "w-full bg-[#f2f2f7] dark:bg-[#1c1c1e] rounded-xl px-4 text-[17px] font-normal text-[#1c1c1e] dark:text-[#f2f2f7] placeholder:text-[#8e8e93] border border-transparent focus:outline-none focus:ring-2 focus:ring-[#007aff] transition-all duration-200",
  label: "text-[13px] font-medium text-[#8e8e93] mb-1.5 tracking-wide uppercase",
  floatingLabel: "absolute left-4 text-[#8e8e93] pointer-events-none transition-all duration-200 ease-out",
  floatingLabelIdle: "top-1/2 -translate-y-1/2 text-[17px]",
  floatingLabelActive: "top-2 -translate-y-0 text-[11px] font-medium uppercase tracking-wide text-[#007aff]",
  error: "text-[13px] text-[#ff3b30] mt-1.5 font-medium",
  errorBorder: "border-[#ff3b30] focus:ring-[#ff3b30]",
  sm: "h-10 text-[15px]",
  md: "h-12 text-[17px]",
  lg: "h-14 text-[19px]",
  floatingPadding: "pt-5 pb-1",
};
