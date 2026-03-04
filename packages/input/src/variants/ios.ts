import type { InputVariant, InputSize } from "../Input";

export const iosStyles: Record<string, string> = {
  wrapper: "relative flex flex-col",
  base: "w-full bg-[#7676801f] dark:bg-[#7676803d] rounded-xl px-4 text-[17px] font-normal text-black dark:text-white placeholder:text-[#3c3c434d] dark:placeholder:text-[#ebebf54d] border border-transparent focus:outline-none focus:ring-[3px] focus:ring-[#007aff]/30 focus:border-[#007aff] transition-all duration-200",
  label: "text-[13px] font-semibold text-[#8e8e93] mb-1.5 uppercase tracking-wider px-1",
  floatingLabel: "absolute left-4 text-[#3c3c434d] dark:text-[#ebebf54d] pointer-events-none transition-all duration-200 ease-out",
  floatingLabelIdle: "top-1/2 -translate-y-1/2 text-[17px]",
  floatingLabelActive: "top-1.5 -translate-y-0 text-[11px] font-semibold uppercase tracking-wider text-[#007aff]",
  error: "text-[13px] text-[#ff3b30] mt-1.5 font-medium px-1",
  errorBorder: "border-[#ff3b30] focus:ring-[#ff3b30]/30 focus:border-[#ff3b30]",
  sm: "h-10 text-[15px]",
  md: "h-12 text-[17px]",
  lg: "h-14 text-[19px]",
  floatingPadding: "pt-5 pb-1",
};
