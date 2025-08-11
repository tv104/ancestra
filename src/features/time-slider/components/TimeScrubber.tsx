import React from "react";

interface TimeScrubberProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  className?: string;
}

export const TimeScrubber: React.FC<TimeScrubberProps> = ({
  min,
  max,
  value,
  onChange,
  onDragStart,
  onDragEnd,
  className = "",
}) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      onMouseDown={onDragStart}
      onMouseUp={onDragEnd}
      onTouchStart={onDragStart}
      onTouchEnd={onDragEnd}
      className={className}
    />
  );
};
