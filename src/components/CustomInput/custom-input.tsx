import { Input, InputProps } from "@/components/ui/input";
import React from "react";


export const CustomInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className="w-full bg-app-background h-[38px] rounded-full placeholder:uppercase text-white px-[20px] py-[12px] font-medium text-xs "
        ref={ref}
        {...props}
      />
    )
  }
)
CustomInput.displayName = "Custom Input"