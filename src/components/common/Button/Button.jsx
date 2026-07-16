import { forwardRef } from "react";

const Button = forwardRef(
  (
    {
      children,
      onClick,
      type = "button",
      variant = "primary",
      disabled = false,
      fullWidth = false,
      size = "md",
      isLoading = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
      secondary: "bg-gray-800 hover:bg-gray-700 text-gray-300 focus:ring-gray-600",
      danger: "bg-red-700 hover:bg-red-600 text-white focus:ring-red-500",
      outline:
        "border-2 border-red-600 text-red-400 hover:bg-red-600 hover:text-white focus:ring-red-500",
      ghost: "bg-transparent hover:bg-gray-800 text-gray-400 hover:text-white focus:ring-gray-600",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-sm",
      lg: "px-6 py-3 text-base",
    };

    const loadingSpinner = (
      <svg
        className="animate-spin h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
    );

    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled || isLoading}
        className={`
          ${baseStyles}
          ${variants[variant]}
          ${sizes[size]}
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
        {...props}
      >
        {isLoading && loadingSpinner}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;