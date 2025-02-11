import React from 'react';
import CircularProgressBar from './CircularProgressBar';

interface AQICardProps {
  value: number | string;
  text: string;
  subText: string;
  color: string;
}

const AQICard: React.FC<AQICardProps> = ({ value, text, subText, color }) => {
  const numericValue = typeof value === 'number' ? value : 0;

  return (
    <div className="relative overflow-hidden rounded-lg bg-white shadow-md dark:bg-boxdark p-4 h-full">
      <div className="z-10 relative flex flex-col h-full">
        <h2 className="text-xl font-bold mb-4 text-left" style={{ color }}>{text}</h2>
        <div className="flex items-center justify-center flex-grow">
          <CircularProgressBar
            value={numericValue}
            maxValue={500}
            size={200}
            strokeWidth={15}
            text="AQI"
            subText={subText}
            color={color}
            textSize="large"
          />
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <svg className="absolute bottom-0 left-0 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill={color} fillOpacity="0.2" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                     M0,128L48,138.7C96,149,192,171,288,181.3C384,192,480,192,576,181.3C672,171,768,149,864,160C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                     M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </path>
        </svg>
      </div>
    </div>
  );
};

export default AQICard;