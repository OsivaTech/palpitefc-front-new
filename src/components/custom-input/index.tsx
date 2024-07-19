import React, { InputHTMLAttributes } from 'react'
import ReactInputMask from 'react-input-mask'

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  mask?: string
  maskChar?: string
  hiddenArrowsNumber?: boolean
  icon?: JSX.Element
}

export const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, type, mask, maskChar, icon, ...props }, ref) => {
    const renderInput = (inputProps: InputHTMLAttributes<HTMLInputElement>) => (
      <div className="relative w-full">
        <h1 className="absolute inset-y-0 left-0 bottom-2 flex items-center pl-3">
          {icon}
        </h1>
        <input
          {...inputProps}
          ref={ref}
          type={type}
          className={`${icon ? 'pl-10' : ''} w-full bg-app-background h-[38px] rounded-full placeholder:uppercase text-white px-[20px] py-[12px] font-medium text-xs ${className}`}
        />
      </div>
    )

    if (mask) {
      return (
        <ReactInputMask mask={mask} maskChar={maskChar} {...props}>
          {renderInput(props)}
        </ReactInputMask>
      )
    } else {
      // Fallback for when no mask is provided
      return renderInput(props)
    }
  },
)

CustomInput.displayName = 'CustomInput'
