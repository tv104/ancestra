import React from "react";
import { Filter, Eye, EyeOff, Check, Minus } from "lucide-react";
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
      className={`bg-gray-800 rounded-lg border border-gray-700 p-4 ${className} flex flex-col`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-300" />
          <h3 className="text-sm font-semibold text-white">Filters</h3>
        </div>
        <button
          onClick={handleToggleAll}
          className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors"
          title={allActive ? "Hide all" : "Show all"}
        >
          {allActive ? (
            <EyeOff className="w-3 h-3" />
          ) : (
            <Eye className="w-3 h-3" />
          )}
          {allActive ? "Hide" : "Show"}
        </button>
      </div>

      <div className="mb-3 text-xs text-gray-400">
        <span className="font-semibold text-white">{totalActiveEvents}</span>{" "}
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
                w-full flex items-center justify-between p-2 rounded border transition-all duration-200 border-transparent
              `}
              style={{
                borderLeftColor: color,
                borderLeftWidth: isActive ? "16px" : "4px",
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{icon}</span>
                <span className="text-xs font-medium">{label}</span>
              </div>

              <div className="flex items-center gap-1">
                <span
                  className={`text-xs px-1.5 py-0.5 rounded ${
                    isActive
                      ? "bg-white bg-opacity-20 text-white"
                      : "bg-gray-600 text-gray-300"
                  }`}
                >
                  {count}
                </span>
                <div
                  className={`w-3 h-3 rounded border flex items-center justify-center ${
                    isActive
                      ? "border-white bg-white bg-opacity-20"
                      : "border-gray-500"
                  }`}
                >
                  {isActive ? (
                    <Check className="w-2 h-2 text-white" />
                  ) : (
                    <Minus className="w-2 h-2 text-gray-400" />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
