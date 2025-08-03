import { useState, useEffect, useMemo } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import styles from "./TimeSlider.module.css";

interface TimeSliderProps {
  minYear: number;
  maxYear: number;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  isPlaying?: boolean;
  onPlayToggle?: () => void;
  playbackSpeed?: number; // days per second
  className?: string;
}

export const TimeSlider: React.FC<TimeSliderProps> = ({
  minYear,
  maxYear,
  currentDate,
  onDateChange,
  isPlaying = false,
  onPlayToggle,
  playbackSpeed = 30,
  className = "",
}) => {
  const [isDragging, setIsDragging] = useState(false);

  // Convert date to slider value (days since minYear)
  const dateToValue = useMemo(() => {
    const minDate = new Date(minYear, 0, 1);
    return (date: Date) => {
      const timeDiff = date.getTime() - minDate.getTime();
      return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    };
  }, [minYear]);

  // Convert slider value to date
  const valueToDate = useMemo(() => {
    const minDate = new Date(minYear, 0, 1);
    return (value: number) => {
      const resultDate = new Date(minDate);
      resultDate.setDate(resultDate.getDate() + value);
      return resultDate;
    };
  }, [minYear]);

  const totalDays = useMemo(() => {
    const minDate = new Date(minYear, 0, 1);
    const maxDate = new Date(maxYear + 1, 0, 1);
    return Math.floor(
      (maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  }, [minYear, maxYear]);

  const currentValue = dateToValue(currentDate);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || isDragging) return;

    const interval = setInterval(() => {
      const newValue = currentValue + 30;
      if (newValue <= totalDays) {
        onDateChange(valueToDate(newValue));
      } else {
        onPlayToggle?.();
      }
    }, 1000 / playbackSpeed);

    return () => clearInterval(interval);
  }, [
    isPlaying,
    currentValue,
    totalDays,
    playbackSpeed,
    isDragging,
    onDateChange,
    valueToDate,
    onPlayToggle,
  ]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    onDateChange(valueToDate(value));
  };

  const jumpToYear = (year: number) => {
    const targetDate = new Date(year, 0, 1);
    onDateChange(targetDate);
  };

  return (
    <div
      className={`bg-gray-800 rounded-lg border border-gray-700 p-4 ${className}`}
    >
      {/* Control buttons */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <button
          onClick={() => jumpToYear(minYear)}
          className="p-2 rounded bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors"
          title="Jump to start"
        >
          <SkipBack className="w-3 h-3" />
        </button>

        {onPlayToggle && (
          <button
            onClick={onPlayToggle}
            className="p-2 rounded bg-historical-600 hover:bg-historical-700 text-white transition-colors"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>
        )}

        <button
          onClick={() => jumpToYear(maxYear)}
          className="p-2 rounded bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors"
          title="Jump to end"
        >
          <SkipForward className="w-3 h-3" />
        </button>
      </div>

      {/* Timeline slider */}
      <div className="relative">
        <div className="relative mt-6">
          <input
            type="range"
            min={0}
            max={totalDays}
            value={currentValue}
            onChange={handleSliderChange}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            className={styles.timeScrubber}
          />
        </div>

        {/* Time range indicators */}
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>{minYear}</span>
          <span className="font-semibold text-historical-400">
            {currentDate.getFullYear()}
          </span>
          <span>{maxYear}</span>
        </div>
      </div>
    </div>
  );
};
