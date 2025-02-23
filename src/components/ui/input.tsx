import * as React from "react"

import { cn } from "@/lib/utils"

// Function to validate URL
const isValidUrl = (url: string): boolean => {
  const urlPattern = new RegExp(
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!urlPattern.test(url);
}

export interface InputProps extends React.ComponentProps<"input"> {
  onEnterPress?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onEnterPress, ...props }, ref) => {
    const [isValid, setIsValid] = React.useState(true);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === " ") {
        event.preventDefault();
      }
      if (event.key === "Enter" && onEnterPress) {
        event.preventDefault();
        onEnterPress();
      }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value.replace(/\s/g, '');
      event.target.value = newValue;
      if (props.onChange && isValidUrl(newValue)) {
        props.onChange(event);
      }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      const value = event.target.value.trim();
      event.target.value = value;
      setIsValid(isValidUrl(value));
    };

    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border",
          isValid ? "border-input" : "border-red-500",
          "bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
