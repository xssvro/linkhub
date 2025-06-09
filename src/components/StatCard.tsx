import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  percentage?: number;
  variant?: 'danger' | 'warning' | 'accent' | 'secondary' | 'primary';
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit = '',
  percentage,
  variant = 'primary',
  icon,
  trend,
  trendValue
}) => {
  const CircularProgress = ({ percent, color }: { percent: number; color: string }) => {
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percent / 100) * circumference;

    return (
      <div className="relative w-12 h-12">
        <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 50 50">
          {/* 背景圆环 */}
          <circle
            cx="25"
            cy="25"
            r={radius}
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            className="text-gray-200 dark:text-gray-700"
          />
          {/* 进度圆环 */}
          <circle
            cx="25"
            cy="25"
            r={radius}
            stroke={color}
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-in-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            {Math.round(percent)}%
          </span>
        </div>
      </div>
    );
  };

  const getVariantStyles = (variant: string) => {
    const styles = {
      danger: {
        color: '#ef4444',
        bgGradient: 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20',
        textColor: 'text-red-600 dark:text-red-400',
        iconBg: 'bg-red-100 dark:bg-red-900/30'
      },
      warning: {
        color: '#f97316',
        bgGradient: 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20',
        textColor: 'text-orange-600 dark:text-orange-400',
        iconBg: 'bg-orange-100 dark:bg-orange-900/30'
      },
      accent: {
        color: '#eab308',
        bgGradient: 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20',
        textColor: 'text-yellow-600 dark:text-yellow-400',
        iconBg: 'bg-yellow-100 dark:bg-yellow-900/30'
      },
      secondary: {
        color: '#a855f7',
        bgGradient: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
        textColor: 'text-purple-600 dark:text-purple-400',
        iconBg: 'bg-purple-100 dark:bg-purple-900/30'
      },
      primary: {
        color: '#3b82f6',
        bgGradient: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
        textColor: 'text-blue-600 dark:text-blue-400',
        iconBg: 'bg-blue-100 dark:bg-blue-900/30'
      }
    };
    return styles[variant as keyof typeof styles] || styles.primary;
  };

  const variantStyle = getVariantStyles(variant);

  const getTrendIcon = () => {
    if (trend === 'up') return '↗';
    if (trend === 'down') return '↘';
    return '→';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-500';
    if (trend === 'down') return 'text-red-500';
    return 'text-gray-500';
  };

  return (
    <div className={`modern-card ${variantStyle.bgGradient} hover-lift`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {icon && (
            <div className={`p-2 rounded-lg ${variantStyle.iconBg}`}>
              <div className={variantStyle.textColor}>
                {icon}
              </div>
            </div>
          )}
          {percentage !== undefined && (
            <CircularProgress percent={percentage} color={variantStyle.color} />
          )}
        </div>
        {trend && trendValue && (
          <div className={`flex items-center space-x-1 text-sm ${getTrendColor()}`}>
            <span>{getTrendIcon()}</span>
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {value}
          </span>
          {unit && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {unit}
            </span>
          )}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          {title}
        </div>
      </div>
    </div>
  );
};

export default StatCard; 