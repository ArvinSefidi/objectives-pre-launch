import Link from 'next/link';
import React, { FC } from 'react';

/**
 * Props for the Button component.
 */
interface ButtonProps {
  to?: string;
  text: React.ReactNode;
  query?: Record<string, string | number>;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "reset" | "submit";
  overlayClassName?: string;
  disabled?: boolean;
}

/**
 * Button Component
 * 
 * This component renders a customizable button. It can function as a standard button or as a link if the `to` prop is provided.
 * 
 * @param {ButtonProps} props - The properties for the Button component.
 * @returns {JSX.Element} The rendered Button component.
 */
const Button: FC<ButtonProps> = ({ 
  to, 
  text, 
  disabled=false,
  query,
  className = '', 
  onClick, 
  type = 'button', 
  overlayClassName = 'bg-gold' 
}) => {
  const buttonContent = (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`py-2 sm:py-3 rounded-xl px-4 sm:px-8 group shadow-lg relative ${className}`}
    >
      <div className={`rounded-lg absolute inset-0 w-0 ${overlayClassName} transition-all duration-300 ease-out group-hover:w-full group-hover:border-r`}></div>
      <span className="relative z-10">
        {text}
      </span>
    </button>
  );

  if (to) {
    return (
      <Link
        href={{
          pathname: to,
          query: query
        }}
      >
        {buttonContent}
      </Link>
    );
  }

  return buttonContent;
};

export default Button;