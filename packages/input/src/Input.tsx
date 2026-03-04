import React, { forwardRef, useState, useId } from "react";
import { iosStyles } from "./variants/ios";
import { androidStyles } from "./variants/android";
import { glassStyles } from "./variants/glass";

export type InputVariant = "default" | "ios" | "android" | "glass";
export type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: InputVariant;
  inputSize?: InputSize;
  label?: string;
  floatingLabel?: boolean;
  error?: string;
  wrapperClassName?: string;
}

const defaultStyles: Record<string, string> = {
  wrapper: "relative flex flex-col",
  base: "w-full bg-white dark:bg-zinc-900 rounded-lg px-4 text-[15px] font-normal text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-900/20 dark:focus:ring-zinc-100/20 focus:border-zinc-400 dark:focus:border-zinc-500 transition-all duration-200",
  label: "text-[13px] font-medium text-zinc-600 dark:text-zinc-400 mb-1.5",
  floatingLabel:
    "absolute left-4 text-zinc-400 dark:text-zinc-500 pointer-events-none transition-all duration-200 ease-out",
  floatingLabelIdle: "top-1/2 -translate-y-1/2 text-[15px]",
  floatingLabelActive:
    "top-2 -translate-y-0 text-[11px] font-medium text-zinc-600 dark:text-zinc-400",
  error: "text-[13px] text-red-500 mt-1.5 font-medium",
  errorBorder: "border-red-500 focus:ring-red-500/20",
  sm: "h-9 text-[13px]",
  md: "h-11 text-[15px]",
  lg: "h-13 text-[17px]",
  floatingPadding: "pt-5 pb-1",
};

const variantMap: Record<InputVariant, Record<string, string>> = {
  default: defaultStyles,
  ios: iosStyles,
  android: androidStyles,
  glass: glassStyles,
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "default",
      inputSize = "md",
      label,
      floatingLabel = false,
      error,
      className = "",
      wrapperClassName = "",
      placeholder,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const styles = variantMap[variant] || defaultStyles;

    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(
      (defaultValue as string) || ""
    );

    const currentValue =
      value !== undefined ? String(value) : internalValue;
    const isActive =
      isFocused || currentValue.length > 0;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const sizeClass = styles[inputSize] || styles.md;
    const errorClass = error ? styles.errorBorder : "";
    const floatingPadding =
      floatingLabel && label ? styles.floatingPadding : "";

    const inputClasses = [
      styles.base,
      sizeClass,
      errorClass,
      floatingPadding,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={`${styles.wrapper} ${wrapperClassName}`}>
        {label && !floatingLabel && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}

        <div className="relative">
          {label && floatingLabel && (
            <label
              htmlFor={inputId}
              className={`${styles.floatingLabel} ${
                isActive
                  ? styles.floatingLabelActive
                  : styles.floatingLabelIdle
              }`}
            >
              {label}
            </label>
          )}
          <input
            ref={ref}
            id={inputId}
            value={value}
            defaultValue={value !== undefined ? undefined : defaultValue}
            placeholder={floatingLabel && label ? "" : placeholder}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={inputClasses}
            {...props}
          />
        </div>

        {error && (
          <span id={`${inputId}-error`} role="alert" className={styles.error}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "ReactMintInput";
