import React, { useMemo } from "react";
import { UserSearch, X } from "lucide-react";

interface PersonFilterProps {
  firstInput: string;
  lastInput: string;
  onFirstInputChange: (value: string) => void;
  onLastInputChange: (value: string) => void;
  className?: string;
}

function parseNames(input: string): string[] {
  return input
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export const PersonFilter: React.FC<PersonFilterProps> = ({
  firstInput,
  lastInput,
  onFirstInputChange,
  onLastInputChange,
  className = "",
}) => {
  const hasAny = useMemo(
    () => parseNames(firstInput).length > 0 || parseNames(lastInput).length > 0,
    [firstInput, lastInput]
  );

  const handleClear = () => {
    onFirstInputChange("");
    onLastInputChange("");
  };

  return (
    <div
      className={`bg-zinc-900 rounded-lg border border-zinc-800 p-4 ${className} flex flex-col gap-3`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UserSearch className="w-4 h-4 text-zinc-300" />
          <h3 className="text-sm font-semibold text-zinc-100">Person filter</h3>
        </div>
        {hasAny && (
          <button
            onClick={handleClear}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded transition-colors"
            title="Clear person filters"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-col gap-5">
        <div>
          <label className="block text-xs text-zinc-300 mb-1">
            First names
          </label>
          <input
            type="text"
            inputMode="text"
            placeholder="e.g. Jan, Pieter"
            className="w-full text-sm px-2 py-1.5 rounded bg-zinc-800 text-zinc-100 placeholder-zinc-500 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
            value={firstInput}
            onChange={(e) => onFirstInputChange(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs text-zinc-300 mb-1">Last names</label>
          <input
            type="text"
            inputMode="text"
            placeholder="e.g. de Vries, Janssen"
            className="w-full text-sm px-2 py-1.5 rounded bg-zinc-800 text-zinc-100 placeholder-zinc-500 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
            value={lastInput}
            onChange={(e) => onLastInputChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
