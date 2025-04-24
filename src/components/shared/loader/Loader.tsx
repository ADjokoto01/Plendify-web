import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

export const Loader = ({
  color = "#000",
  size = 150,
  className,
  height = "h-[500px]",
}: {
  color?: string;
  size?: number;
  className?: string;
  height?: string;
}) => {
  const [rotation, setRotation] = useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setRotation((prev) => (prev + 2) % 360);
    }, 20);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div
      className={cn(
        `flex items-center justify-center h-${height} w-4`,
        className
      )}
    >
      <div className="relative flex items-center justify-center bg-white rounded-full h-48 w-48">
        {/* Spinning border */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from ${rotation}deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b, #10b981, #3b82f6)`,
            padding: "1px",
          }}
        >
          <div className="bg-white h-full w-full rounded-full flex items-center justify-center">
            {/* Logo in the middle */}
            <div className="text-blue-500">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk09LUX3HqdCmqautJgLjxyvLcVwpKFtiuPQ&s"
                alt="Plendify Logo rounded-full"
                className="w-full h-full rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
