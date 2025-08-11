import { useState, useEffect, useMemo } from "react";
import styles from "./TimeSlider.module.css";
import { HeaderControls } from "./components/HeaderControls";
import { TimeWindowControl } from "./components/TimeWindowControl";
import { RangeIndicators } from "./components/RangeIndicators";
import { TimeScrubber } from "./components/TimeScrubber";

interface TimeSliderProps {
  minYear: number;
  maxYear: number;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  isPlaying?: boolean;
  onPlayToggle?: () => void;
  playbackSpeed?: number; // days per second
  onPlaybackSpeedChange?: (speed: number) => void;
  timeWindowDays?: number;
  onTimeWindowDaysChange?: (days: number) => void;
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
  timeWindowDays = 3650,
  onTimeWindowDaysChange,
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
      const newValue = currentValue + playbackSpeed;
      if (newValue <= totalDays) {
        onDateChange(valueToDate(newValue));
      } else {
        onPlayToggle?.();
      }
    }, 1000);

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

  const jumpToYear = (year: number) => {
    const targetDate = new Date(year, 0, 1);
    onDateChange(targetDate);
  };

  return (
    <div
      className={`bg-zinc-900 rounded-lg border border-zinc-800 p-4 flex flex-col gap-4 ${className}`}
    >
      <div className="flex flex-col gap-2">
        <RangeIndicators
          minYear={minYear}
          currentYear={currentDate.getFullYear()}
          maxYear={maxYear}
        />

        <TimeScrubber
          min={0}
          max={totalDays}
          value={currentValue}
          onChange={(v: number) => onDateChange(valueToDate(v))}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          className={styles.timeScrubber}
        />
      </div>

      <div className="flex flex-row gap-4 w-full justify-between items-center">
        <HeaderControls
          minYear={minYear}
          maxYear={maxYear}
          isPlaying={isPlaying}
          onJumpToYear={jumpToYear}
          onPlayToggle={onPlayToggle}
        />
        <TimeWindowControl
          value={timeWindowDays}
          onChange={onTimeWindowDaysChange}
        />
      </div>
    </div>
  );
};
