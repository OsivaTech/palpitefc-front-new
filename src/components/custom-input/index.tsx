import React, { InputHTMLAttributes } from 'react';
import ReactInputMask from 'react-input-mask';


interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  mask?: string;
  maskChar?: string;
}

export const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, type, mask , maskChar, ...props }, ref) => {

    const renderInput = (inputProps: InputHTMLAttributes<HTMLInputElement>) => (
      <input
        {...inputProps}
        ref={ref}
        type={type}
        className={`w-full bg-app-background h-[38px] rounded-full placeholder:uppercase text-white px-[20px] py-[12px] font-medium text-xs ${className}`}
      />
    ) ;

   if (mask) {
      return (
        <ReactInputMask mask={mask} maskChar={maskChar} {...props}>
           {renderInput(props)}
        </ReactInputMask>
      );
    } else {
      // Fallback for when no mask is provided
      return renderInput(props);
    }
  }
);

CustomInput.displayName = "CustomInput";