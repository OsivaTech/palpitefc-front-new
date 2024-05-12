
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";




export const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <Button
        className={cn("w-full bg-app-background h-[38px] rounded-full placeholder:uppercase text-white px-[20px] py-[12px] font-medium text-xs border border-white", className)}
        ref={ref}
        {...props}
      />
    )
  }
)
CustomButton.displayName = "Button"