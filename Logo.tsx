import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  size = 32,
  glow = true,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Glow Layer */}
      {glow && (
        <div className="absolute inset-0 bg-[#00D2FF]/10 rounded-full blur-md animate-pulse"></div>
      )}

      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 transition-transform duration-500 group-hover:scale-105"
      >
        <defs>
          {/* Gradients matching the user's GT logo perfectly */}
          <linearGradient id="g-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B1A30" />
            <stop offset="50%" stopColor="#122B4C" />
            <stop offset="100%" stopColor="#1E3E62" />
          </linearGradient>

          <linearGradient id="t-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D2FF" />
            <stop offset="100%" stopColor="#0066FF" />
          </linearGradient>

          <linearGradient
            id="orbit-gradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#0052D4" />
            <stop offset="50%" stopColor="#4364F7" />
            <stop offset="100%" stopColor="#6FB1FC" />
          </linearGradient>

          <linearGradient
            id="pixel-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#00D2FF" />
            <stop offset="100%" stopColor="#0052D4" />
          </linearGradient>
        </defs>

        {/* Orbit Ring (Back part - sits behind G) */}
        <path
          d="M 64,57 C 74,52 79,42 79,32 C 77,35 72,42 64,46 Z"
          fill="url(#orbit-gradient)"
          className="opacity-90"
        />

        {/* The Bold "G" Shape */}
        <path
          d="M 63.5,12.5 L 39,12.5 C 22,12.5 15,24.5 15,48.5 C 15,72.5 22,81.5 44,81.5 C 47.5,81.5 50.5,80.5 52,78 L 52,65.5 C 49,67.5 46,68.5 42,68.5 C 29,68.5 26.5,58.5 26.5,48.5 C 26.5,32.5 30.5,23.5 42,23.5 L 59.5,23.5 Z"
          fill="url(#g-gradient)"
        />

        {/* Orbit Ring (Front part - wraps around G) */}
        <path
          d="M 19,53 C 16,63 21,72 35,74 C 42,75 51,71 52,65 C 48,68 41,70 35,69 C 24,67 21,59 23,51 Z"
          fill="url(#orbit-gradient)"
          className="opacity-95"
        />

        {/* The Stylish "T" Shape */}
        <path
          d="M 36.5,32.5 L 74.5,32.5 L 74.5,41.5 H 62 L 62,60 C 62,66.5 58,71 53.5,72.5 V 41.5 H 40 Z"
          fill="url(#t-gradient)"
        />

        {/* Floating Digital Pixel/Tech Elements */}
        <rect
          x="61.5"
          y="26.5"
          width="4.5"
          height="4.5"
          fill="url(#pixel-gradient)"
          className="opacity-90"
        />
        <rect
          x="68"
          y="26.5"
          width="3.5"
          height="3.5"
          fill="url(#pixel-gradient)"
          className="opacity-80"
        />
        <rect
          x="67"
          y="21.5"
          width="3"
          height="3"
          fill="url(#pixel-gradient)"
          className="opacity-90"
        />
        <rect
          x="71"
          y="21.5"
          width="3.5"
          height="3.5"
          fill="url(#pixel-gradient)"
          className="opacity-95"
        />
        <rect
          x="69.5"
          y="15"
          width="4"
          height="4"
          fill="url(#pixel-gradient)"
          className="opacity-90"
        />
        <rect
          x="72.5"
          y="10.5"
          width="2.5"
          height="2.5"
          fill="url(#pixel-gradient)"
          className="opacity-70"
        />
      </svg>
    </div>
  );
};
