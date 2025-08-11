import React from "react";

interface RangeIndicatorsProps {
  minYear: number;
  currentYear: number;
  maxYear: number;
}

export const RangeIndicators: React.FC<RangeIndicatorsProps> = ({
  minYear,
  currentYear,
  maxYear,
}) => {
  return (
    <div className="flex w-full justify-between text-xs text-zinc-400 mt-2">
      <span>{minYear}</span>
      <span className="font-semibold text-historical-400">{currentYear}</span>
      <span>{maxYear}</span>
    </div>
  );
};
