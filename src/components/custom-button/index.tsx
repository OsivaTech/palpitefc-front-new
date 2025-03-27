import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import React from 'react'

export const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, isLoading = false, ...props }, ref) => {
    return (
      <Button
        className={cn(
          'w-full bg-app-background h-[38px] placeholder:uppercase text-white px-[20px] py-[12px] font-medium text-xs ',
          className,
        )}
        ref={ref}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {props.children}
      </Button>
    )
  },
)
CustomButton.displayName = 'Button'
