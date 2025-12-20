import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  isLoading = false,
  disabled,
  className = '',
  ...props
}) => {
  const baseStyles = `
    font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
    ${isLoading ? 'cursor-wait' : ''}
  `;

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm rounded-full',
    md: 'px-6 py-3 text-base rounded-full',
    lg: 'px-8 py-4 text-lg rounded-full'
  };

  const variantStyles = {
    primary: `
      bg-gradient-to-r from-primary via-secondary to-accent
      text-white shadow-lg hover:shadow-xl
      hover:scale-105 active:scale-95
      focus:ring-primary/50
    `,
    secondary: `
      bg-secondary text-white shadow-md hover:shadow-lg
      hover:bg-secondary/90 hover:scale-105 active:scale-95
      focus:ring-secondary/50
    `,
    outline: `
      border-2 border-primary text-primary bg-transparent
      hover:bg-primary hover:text-white hover:scale-105 active:scale-95
      focus:ring-primary/50
    `,
    ghost: `
      text-body bg-transparent hover:bg-softPurple hover:text-heading
      hover:scale-105 active:scale-95
      focus:ring-primary/50
    `
  };

  const combinedClassName = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${className}
  `.trim();

  return (
    <button
      className={combinedClassName}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
