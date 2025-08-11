import React from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface HeaderControlsProps {
  minYear: number;
  maxYear: number;
  isPlaying: boolean;
  onJumpToYear: (year: number) => void;
  onPlayToggle?: (() => void) | undefined;
}

export const HeaderControls: React.FC<HeaderControlsProps> = ({
  minYear,
  maxYear,
  isPlaying,
  onJumpToYear,
  onPlayToggle,
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onJumpToYear(minYear)}
        className="p-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-zinc-100 transition-colors"
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
        onClick={() => onJumpToYear(maxYear)}
        className="p-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-zinc-100 transition-colors"
        title="Jump to end"
      >
        <SkipForward className="w-3 h-3" />
      </button>
    </div>
  );
};
