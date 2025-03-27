import React, { InputHTMLAttributes } from 'react'
import ReactInputMask from 'react-input-mask'

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  mask?: string
  maskChar?: string
  hiddenArrowsNumber?: boolean
  icon?: JSX.Element
  value2?: string
  label?: string
}

export const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, type, mask, maskChar, icon, value2, label, ...props }, ref) => {
    const renderInput = (inputProps: InputHTMLAttributes<HTMLInputElement>) => (
      <div className="relative w-full">
        {label && (
          <label className="block text-white text-sm font-medium">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute inset-y-0 left-0 bottom-2 flex items-center pl-3">
              {icon}
            </span>
          )}
          <input
            {...inputProps}
            ref={ref}
            type={type}
            className={`${icon ? 'pl-10' : ''} w-full bg-transparent border-b border-white h-[32px] placeholder-white/70 font-medium text-xs ${className}`}
          />
          {value2 && (
            <span className="absolute inset-y-0 right-0 flex items-center pl-3 text-white px-[20px] font-medium text-xs">
              {value2}
            </span>
          )}
        </div>
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
