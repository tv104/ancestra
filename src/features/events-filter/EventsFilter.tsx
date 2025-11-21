import React from "react";
import { Filter, Eye, EyeOff } from "lucide-react";
import { EVENT_TYPE_CONFIG, EventName } from "@/entities";

interface EventFilterProps {
  activeEventTypes: Set<EventName>;
  onEventTypeToggle: (eventType: EventName) => void;
  eventCounts: Record<EventName, number>;
  className?: string;
}

export const EventsFilter: React.FC<EventFilterProps> = ({
  activeEventTypes,
  onEventTypeToggle,
  eventCounts,
  className = "",
}) => {
  const totalActiveEvents = Object.entries(eventCounts)
    .filter(([type]) => activeEventTypes.has(type as EventName))
    .reduce((sum, [, count]) => sum + count, 0);

  const allTypes = Object.keys(EVENT_TYPE_CONFIG) as EventName[];
  const allActive = allTypes.every((type) => activeEventTypes.has(type));
  const noneActive = allTypes.every((type) => !activeEventTypes.has(type));

  const handleToggleAll = () => {
    if (allActive || noneActive) {
      allTypes.forEach((type) => {
        if (allActive && activeEventTypes.has(type)) {
          onEventTypeToggle(type);
        } else if (noneActive && !activeEventTypes.has(type)) {
          onEventTypeToggle(type);
        }
      });
    } else {
      // If mixed, activate all
      allTypes.forEach((type) => {
        if (!activeEventTypes.has(type)) {
          onEventTypeToggle(type);
        }
      });
    }
  };

  return (
    <div
      className={`bg-zinc-900 rounded-lg border border-zinc-800 p-4 ${className} flex flex-col overflow-hidden`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-zinc-300" />
          <h3 className="text-sm font-semibold text-zinc-100">
            Events filters
          </h3>
        </div>
        <button
          onClick={handleToggleAll}
          className="flex items-center gap-1 px-2 py-1 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded transition-colors"
          title={allActive ? "Hide all" : "Show all"}
        >
          {allActive ? (
            <EyeOff className="w-3 h-3" />
          ) : (
            <Eye className="w-3 h-3" />
          )}
          {allActive ? "Hide all" : "Show all"}
        </button>
      </div>

      <div className="mb-3 text-xs text-zinc-400">
        <span className="font-semibold text-zinc-100">{totalActiveEvents}</span>{" "}
        shown
      </div>

      <div className="space-y-1 flex-1 overflow-y-auto">
        {allTypes.map((eventType) => {
          const { color, icon, label } = EVENT_TYPE_CONFIG[eventType];
          const isActive = activeEventTypes.has(eventType);
          const count = eventCounts[eventType] || 0;

          return (
            <button
              key={eventType}
              onClick={() => onEventTypeToggle(eventType)}
              className={`
                w-full flex items-center justify-between p-1 rounded border transition-colors duration-200 border-transparent hover:bg-zinc-800/60
              `}
              style={{
                borderLeftColor: color,
                borderLeftWidth: isActive ? "16px" : "4px",
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{icon}</span>
                <span className="text-xs font-medium text-zinc-100">
                  {label}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <span
                  className={`text-xs px-1.5 py-0.5 rounded ${isActive
                    ? "bg-white/15 text-zinc-100"
                    : "bg-zinc-700 text-zinc-400"
                    }`}
                >
                  {count}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
