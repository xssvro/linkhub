import React from 'react';
import { ReactNode } from 'react';

interface ModernCardProps {
  children: ReactNode;
  variant?: 'default' | 'gradient-danger' | 'gradient-warning' | 'gradient-accent' | 'gradient-secondary' | 'gradient-primary';
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

const ModernCard: React.FC<ModernCardProps> = ({
  children,
  variant = 'default',
  className = '',
  hoverable = true,
  onClick
}) => {
  const baseClasses = 'p-6 transition-all duration-300';
  
  const variantClasses = {
    default: 'modern-card',
    'gradient-danger': 'gradient-card-danger',
    'gradient-warning': 'gradient-card-warning',
    'gradient-accent': 'gradient-card-accent',
    'gradient-secondary': 'gradient-card-secondary',
    'gradient-primary': 'gradient-card-primary'
  };

  const hoverClasses = hoverable ? 'hover-lift cursor-pointer' : '';
  const clickClasses = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${clickClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ModernCard; 