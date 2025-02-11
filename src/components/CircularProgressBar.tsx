import React from 'react';

interface CircularProgressBarProps {
  value: number | string;
  maxValue: number;
  size: number;
  strokeWidth: number;
  text: string;
  subText: string;
  color: string;
  textSize?: 'small' | 'medium' | 'large';
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  value,
  maxValue,
  size,
  strokeWidth,
  text,
  subText,
  color,
  textSize = 'medium',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (typeof value === 'number' ? (value / maxValue) * circumference : 0);

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg className="w-full h-auto" viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="text-gray-200"
          strokeWidth={strokeWidth * 0.4}
          stroke="#E5E7EB"
          fill="transparent"
          r={radius * 0.8} // Reduce the radius by 20%
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-primary"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference * 0.8} // Adjust the circumference
          strokeDashoffset={strokeDashoffset * 0.8} // Adjust the offset
          strokeLinecap="round"
          stroke={color}
          fill="transparent"
          r={radius * 0.8} // Reduce the radius by 20%
          cx={size / 2}
          cy={size / 2}
          style={{
            transition: 'stroke-dashoffset 0.5s ease 0s',
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-bold ${textSize === 'small' ? 'text-lg sm:text-xl md:text-2xl lg:text-3xl' : 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl'}`} style={{ color }}>{value}</span>
        <span className={`font-medium text-gray-500 ${textSize === 'small' ? 'text-xxs sm:text-xs md:text-sm' : 'text-xs sm:text-sm md:text-base lg:text-lg'}`}>{text}</span>
        <span className={`text-gray-400 ${textSize === 'small' ? 'text-xxs sm:text-xs' : 'text-xxs sm:text-xs md:text-sm lg:text-base'}`}>{subText}</span>
      </div>
    </div>
  );
};

export default CircularProgressBar;