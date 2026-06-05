/**
 * Button Component - Base UI Component
 * 
 * Reusable button component with multiple variants and sizes.
 * This is a foundational UI component used throughout the application.
 * 
 * Usage:
 * <Button variant="primary" size="lg">Click Me</Button>
 */

import React from 'react';
import styles from './Button.module.css';

const Button = React.forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      disabled = false,
      fullWidth = false,
      onClick,
      type = 'button',
      className = '',
      ...props
    },
    ref
  ) => {
    const buttonClasses = [
      styles.button,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      fullWidth && styles.fullWidth,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
