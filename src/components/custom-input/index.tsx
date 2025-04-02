import { forwardRef } from 'react'
import InputMask from 'react-input-mask'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  mask?: string
  label?: string
  error?: string
  className?: string
}

export const CustomInput = forwardRef<HTMLInputElement, Props>(
  ({ mask, label, error, className, ...props }, ref) => {
    if (mask) {
      return (
        <div className="flex w-full flex-col gap-1">
          {label && (
            <label className="text-sm font-medium text-gray-700">{label}</label>
          )}
          <InputMask mask={mask} {...props}>
            {(inputProps: any) => (
              <input ref={ref} className={className} {...inputProps} />
            )}
          </InputMask>
          {error && <span className="text-sm text-red-500">{error}</span>}
        </div>
      )
    }

    return (
      <div className="flex w-full flex-col gap-1">
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}
        <input ref={ref} className={className} {...props} />
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    )
  },
)

CustomInput.displayName = 'CustomInput'
