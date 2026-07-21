import React from 'react';

export const FloralCornerTopLeft: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    viewBox="0 0 200 200"
    className={`w-28 h-28 sm:w-40 sm:h-40 pointer-events-none ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 10C50 30 90 20 130 10C100 60 70 90 10 130C20 90 30 50 10 10Z"
      fill="url(#floral-grad-1)"
      opacity="0.4"
    />
    <path
      d="M30 10C70 40 120 40 170 20C120 80 80 120 20 170C40 120 40 70 30 10Z"
      fill="url(#floral-grad-2)"
      opacity="0.3"
    />
    <circle cx="45" cy="45" r="8" fill="#fde047" opacity="0.6" />
    <circle cx="75" cy="30" r="5" fill="#fb7185" opacity="0.7" />
    <circle cx="30" cy="75" r="5" fill="#f43f5e" opacity="0.7" />
    <defs>
      <linearGradient id="floral-grad-1" x1="0" y1="0" x2="150" y2="150" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f43f5e" />
        <stop offset="1" stopColor="#eab308" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="floral-grad-2" x1="0" y1="0" x2="170" y2="170" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fda4af" />
        <stop offset="1" stopColor="#881337" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export const FloralDivider: React.FC = () => (
  <div className="flex items-center justify-center gap-3 my-8 opacity-80">
    <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-amber-300/60"></div>
    <span className="text-amber-300 text-lg">🌸</span>
    <span className="text-rose-400 text-sm font-cursive text-amber-200">21 de Julio</span>
    <span className="text-amber-300 text-lg">🌸</span>
    <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-amber-300/60"></div>
  </div>
);
