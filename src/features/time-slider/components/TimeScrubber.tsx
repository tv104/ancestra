import React from "react";

export interface TimeScrubberProps {
  min: number;
  max: number;
  value: number;
  step?: number;
  onChange: (value: number) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const TimeScrubber: React.FC<TimeScrubberProps> = ({
  min,
  max,
  value,
  step = 1,
  onChange,
  onDragStart,
  onDragEnd,
  className = "",
  style,
}) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      step={step}
      onChange={(e) => onChange(Number(e.target.value))}
      onMouseDown={onDragStart}
      onMouseUp={onDragEnd}
      onTouchStart={onDragStart}
      onTouchEnd={onDragEnd}
      className={className}
      style={style}
    />
  );
};
