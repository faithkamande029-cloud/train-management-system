import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      name,
      type = "text",
      value,
      onChange,
      onBlur,
      placeholder,
      required = false,
      disabled = false,
      error,
      icon,
      className = "",
      ...props
    },
    ref
  ) => {
    const inputId = `input-${name}`;
    return (
      <div className={`flex flex-col gap-1 w-full ${className}`}>
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-gray-300">
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={`
              w-full p-3 rounded-lg border outline-none transition text-sm
              bg-gray-800 text-white placeholder-gray-500
              focus:ring-2 focus:ring-red-500 focus:border-transparent
              disabled:opacity-50 disabled:cursor-not-allowed
              ${error ? "border-red-500" : "border-gray-700"}
              ${icon ? "pl-10" : ""}
            `}
            {...props}
          />
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-red-400 text-xs mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;