import { ClusterGroup, EnhancedMapEvent } from "../";
import { generateSpiderfiedPositions } from "./generate-spiderfied-positions";

export const createClusters = (
  events: EnhancedMapEvent[],
  zoom: number = 10
): ClusterGroup[] => {
  if (events.length === 0) return [];

  const baseDistance = 0.001;
  const zoomFactor = Math.max(0.1, 1 / Math.pow(2, zoom - 8));
  const clusterDistance = baseDistance * zoomFactor;

  const clusters: ClusterGroup[] = [];
  const processed = new Set<string>();

  events.forEach((event) => {
    if (processed.has(event.id) || !event.location.coordinates) return;

    const clusterEvents: EnhancedMapEvent[] = [event];
    processed.add(event.id);

    events.forEach((otherEvent) => {
      if (processed.has(otherEvent.id) || !otherEvent.location.coordinates) return;

      const distance = Math.sqrt(
        Math.pow(event.location.coordinates!.lat - otherEvent.location.coordinates!.lat, 2) +
        Math.pow(event.location.coordinates!.lng - otherEvent.location.coordinates!.lng, 2)
      );

      if (distance <= clusterDistance) {
        clusterEvents.push(otherEvent);
        processed.add(otherEvent.id);
      }
    });

    const avgLat = clusterEvents.reduce((sum, e) => sum + e.location.coordinates!.lat, 0) / clusterEvents.length;
    const avgLng = clusterEvents.reduce((sum, e) => sum + e.location.coordinates!.lng, 0) / clusterEvents.length;

    const positions = generateSpiderfiedPositions(
      { lat: avgLat, lng: avgLng },
      clusterEvents.length,
      clusterDistance
    );

    const eventIds = clusterEvents.map(e => e.id).sort().join('-');
    const stableId = `cluster-${Math.round(avgLat * 10000)}-${Math.round(avgLng * 10000)}-${eventIds}`;

    clusters.push({
      id: stableId,
      events: clusterEvents,
      center: { lat: avgLat, lng: avgLng },
      positions,
    });
  });

  return clusters;
};