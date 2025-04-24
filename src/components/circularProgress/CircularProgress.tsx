const CircularProgress = ({
  size = 64,
  strokeWidth = 10,
  percentage = 75,
  step = 1,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#6929C4" // Tailwind gray-200
        strokeWidth={strokeWidth}
        opacity={0.2}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#5433EB"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-300"
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="1rem"
        fill="#0C406C"
      >
        <div className="flex items-center gap-2">
          <p className="text-[#6E6E6E] text-xs">{percentage}%</p>
          <p className="text-[#6E6E6E] text-xs">
            {step}/{step === 1 ? 4 : step === 2 ? 3 : 2}
          </p>
        </div>
      </text>
    </svg>
  );
};

export default CircularProgress;
