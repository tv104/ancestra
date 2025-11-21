import { useState, useEffect, useMemo, useRef } from "react";
import type { CSSProperties } from "react";
import styles from "./TimeSlider.module.css";
// import { HeaderControls } from "./components/HeaderControls";
// import { TimeWindowControl } from "./components/TimeWindowControl";
import { RangeIndicators } from "./components/RangeIndicators";
import { TimeScrubber } from "./components/TimeScrubber";
import { MapEvent } from "../map-events";

const DAY_MS = 1000 * 60 * 60 * 24;
const EMIT_INTERVAL_MS = 50;
const MIN_THUMB_PX = 4;

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
  events: MapEvent[];
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
  events,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  // Date <-> slider value helpers (days since minYear)
  const minDate = useMemo(() => new Date(minYear, 0, 1), [minYear]);
  const maxDateExclusive = useMemo(
    () => new Date(maxYear + 1, 0, 1),
    [maxYear]
  );
  const dateToValue = useMemo(() => {
    return (date: Date) => (date.getTime() - minDate.getTime()) / DAY_MS;
  }, [minDate]);
  const valueToDate = useMemo(() => {
    return (value: number) => new Date(minDate.getTime() + value * DAY_MS);
  }, [minDate]);

  const totalDays = useMemo(() => {
    return Math.floor(
      (maxDateExclusive.getTime() - minDate.getTime()) / DAY_MS
    );
  }, [minDate, maxDateExclusive]);

  const currentValue = dateToValue(currentDate);

  useEffect(() => {
    if (!isPlaying || isDragging) return;

    const stepDays = (playbackSpeed * EMIT_INTERVAL_MS) / 1000;
    const intervalId = window.setInterval(() => {
      const nextValue = Math.min(currentValue + stepDays, totalDays);
      onDateChange(valueToDate(nextValue));
      if (nextValue >= totalDays) {
        onPlayToggle?.();
      }
    }, EMIT_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [
    isPlaying,
    isDragging,
    playbackSpeed,
    totalDays,
    currentValue,
    onDateChange,
    valueToDate,
    onPlayToggle,
  ]);

  // const jumpToYear = (year: number) => {
  //   const targetDate = new Date(year, 0, 1);
  //   onDateChange(targetDate);
  // };

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  useEffect(() => {
    if (!containerRef.current) return;
    const measure = () =>
      setContainerWidth(containerRef.current!.getBoundingClientRect().width);
    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(containerRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const thumbWidthPx = useMemo(
    () =>
      Math.max(
        MIN_THUMB_PX,
        Math.min(1, timeWindowDays / Math.max(1, totalDays)) * containerWidth
      ),
    [containerWidth, timeWindowDays, totalDays]
  );
  type StyleWithVars = CSSProperties & Record<string, string | number>;
  const scrubberStyle = useMemo<StyleWithVars>(
    () => ({ "--thumbWidthPx": `${thumbWidthPx}px` }),
    [thumbWidthPx]
  );

  return (
    <div
      className={`bg-zinc-900 rounded-lg border border-zinc-800 p-4 pt-0 flex flex-col gap-4 ${className}`}
    >
      <div className="flex flex-col gap-2">
        <div className="relative h-[80px]" ref={containerRef}>
          <RangeIndicators
            minYear={minYear}
            currentYear={currentDate.getFullYear()}
            maxYear={maxYear}
            events={events}
            className="pointer-events-none select-none"
          />

          <TimeScrubber
            min={0}
            max={totalDays}
            value={currentValue}
            step={0.01}
            onChange={(v: number) => onDateChange(valueToDate(v))}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            className={`${styles.timeScrubber} absolute inset-0 z-20`}
            style={scrubberStyle}
          />
        </div>
      </div>

      {/* <div className="flex flex-row gap-4 w-full justify-between items-center">
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
      </div> */}
    </div>
  );
};
