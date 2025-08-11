import React from "react";

interface TimeWindowControlProps {
  value: number;
  min?: number;
  max?: number;
  onChange?: ((value: number) => void) | undefined;
}

export const TimeWindowControl: React.FC<TimeWindowControlProps> = ({
  value,
  min = 365,
  max = 3650,
  onChange,
}) => {
  return (
    <div className="w-full">
      <div className="text-xs text-zinc-400 mb-1">Window: {value}d</div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange?.(Number(e.target.value))}
        className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
};
