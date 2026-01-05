// src/components/ui/Input.jsx
import React from 'react';

const Input = ({
  label,
  error,
  helperText,
  className = '',
  required = false,
  ...props
}) => {
  const baseClasses =
    'input input-bordered bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 w-full';

  const errorClasses = error ? 'border-red-500 focus:border-red-500' : '';

  const classes = `${baseClasses} ${errorClasses} ${className}`;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <input className={classes} {...props} />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-400">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
