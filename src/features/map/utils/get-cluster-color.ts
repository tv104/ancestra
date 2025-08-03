import { EVENT_TYPE_CONFIG } from "@/entities";
import { EnhancedMapEvent } from "../Map";

export const getClusterColor = (events: EnhancedMapEvent[]): string => {
  const typeCounts: Record<string, number> = {};

  events.forEach((event) => {
    typeCounts[event.event.type] = (typeCounts[event.event.type] || 0) + 1;
  });

  const sortedTypes = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]);
  const majorityType = sortedTypes[0][0] as EnhancedMapEvent["event"]["type"];
  return EVENT_TYPE_CONFIG[majorityType].color;
};