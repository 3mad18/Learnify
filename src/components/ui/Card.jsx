// src/components/ui/Card.jsx
import React from 'react';

const Card = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'none',
  hover = true,
  ...props
}) => {
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const shadows = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const hoverClasses = hover ? 'hover:border-cyan-600 transition' : '';

  const classes = `bg-gray-800 rounded-lg border border-gray-700 ${paddings[padding]} ${shadows[shadow]} ${hoverClasses} ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;
