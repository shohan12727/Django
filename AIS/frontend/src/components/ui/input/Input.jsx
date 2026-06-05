/**
 * Input Component - Base UI Component
 * 
 * Reusable input component for forms with consistent styling.
 */

import React from 'react';
import styles from './Input.module.css';

const Input = React.forwardRef(
  (
    {
      type = 'text',
      placeholder = '',
      value,
      onChange,
      error = '',
      label = '',
      required = false,
      disabled = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const inputClasses = [
      styles.input,
      error && styles.error,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={styles.container}>
        {label && (
          <label className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={inputClasses}
          {...props}
        />
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
