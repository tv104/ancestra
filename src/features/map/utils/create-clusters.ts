import { ClusterGroup, EnhancedMapEvent } from "../";
import { generateSpiderfiedPositions } from "./generate-spiderfied-positions";
import { pixelDistance, pixelRadiusToDegreeRadius } from "./projection";

export const createClusters = (
  events: EnhancedMapEvent[],
  zoom: number = 10,
  pixelClusterRadius: number = 28
): ClusterGroup[] => {
  if (events.length === 0) return [];
  const clusters: ClusterGroup[] = [];
  const processed = new Set<string>();

  events.forEach((event) => {
    if (processed.has(event.id) || !event.location.coordinates) return;

    const clusterEvents: EnhancedMapEvent[] = [event];
    processed.add(event.id);

    events.forEach((otherEvent) => {
      if (processed.has(otherEvent.id) || !otherEvent.location.coordinates) return;

      const distancePx = pixelDistance(
        event.location.coordinates!,
        otherEvent.location.coordinates!,
        zoom
      );

      if (distancePx <= pixelClusterRadius) {
        clusterEvents.push(otherEvent);
        processed.add(otherEvent.id);
      }
    });

    const avgLat = clusterEvents.reduce((sum, e) => sum + e.location.coordinates!.lat, 0) / clusterEvents.length;
    const avgLng = clusterEvents.reduce((sum, e) => sum + e.location.coordinates!.lng, 0) / clusterEvents.length;

    const degreeRadius = pixelRadiusToDegreeRadius({ lat: avgLat, lng: avgLng }, zoom, pixelClusterRadius);
    const positions = generateSpiderfiedPositions(
      { lat: avgLat, lng: avgLng },
      clusterEvents.length,
      degreeRadius
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