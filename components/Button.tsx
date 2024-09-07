"use client";

import { useState } from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = "primary",
  disabled = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onClick();
    } finally {
      setIsLoading(false);
    }
  };

  const buttonClasses = `
    ${
      variant === "primary"
        ? "bg-blue-500 hover:bg-blue-700 text-white"
        : variant === "secondary"
        ? "bg-gray-800 hover:bg-gray-900 text-white"
        : "border border-gray-400 hover:border-gray-500 text-gray-800"
    }
    px-4 py-2 rounded focus:outline-none focus:shadow-outline
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
  `;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={buttonClasses}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 text-white"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="none"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291l.285.286a1 1 0 001.415-1.415l-1.75-1.751c-.39-.39-.861-.667-1.415-.667h-2v4z"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;