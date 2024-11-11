import React, { forwardRef, useEffect, useRef } from 'react'

interface CustomTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon?: React.ReactNode
  value2?: string
  className?: string
}

const CustomTextArea = forwardRef<HTMLTextAreaElement, CustomTextAreaProps>(
  ({ icon, value2, className, ...props }, ref) => {
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

    useEffect(() => {
      if (textAreaRef.current) {
        textAreaRef.current.style.height = 'auto'
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
      }
    }, [props.value])

    const renderTextArea = (inputProps: CustomTextAreaProps) => (
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            {icon}
          </div>
        )}
        <textarea
          {...inputProps}
          ref={(el) => {
            textAreaRef.current = el
            if (typeof ref === 'function') {
              ref(el)
            } else if (ref) {
              ;(
                ref as React.MutableRefObject<HTMLTextAreaElement | null>
              ).current = el
            }
          }}
          className={`${icon ? 'pl-10' : ''} w-full bg-app-background rounded-lg placeholder:uppercase text-white px-[20px] py-[12px] font-medium text-xs ${className}`}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement
            target.style.height = 'auto'
            target.style.height = `${target.scrollHeight}px`
          }}
        />
        {value2 && (
          <h1 className="absolute inset-y-0 bottom-4 right-0 flex items-center pl-3 text-white px-[20px] font-medium text-xs">
            {value2}
          </h1>
        )}
      </div>
    )

    return renderTextArea(props)
  },
)

CustomTextArea.displayName = 'CustomTextArea'

export default CustomTextArea
