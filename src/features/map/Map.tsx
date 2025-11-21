import throttle from "lodash.throttle";
import { useState, useMemo } from "react";
import { MapEvent } from "../map-events";
import { MapZoomTracker, SingleMarker, ClusterMarker } from "./components";
import { createClusters } from "./utils";
import { MapContainer, TileLayer } from "react-leaflet";

interface MapProps {
  events: MapEvent[];
  currentDate: Date;
  timeWindowDays?: number;
  className?: string;
}

interface EventDynamics {
  scale: number;
  temporalDistance: number;
}

export interface EnhancedMapEvent extends MapEvent {
  dynamics: EventDynamics;
}

export interface ClusterGroup {
  id: string;
  events: EnhancedMapEvent[];
  center: { lat: number; lng: number };
  positions: { lat: number; lng: number }[];
}

export const Map: React.FC<MapProps> = ({
  events,
  currentDate,
  timeWindowDays = 365 * 10,
  className = "",
}) => {
  const [zoom, setZoom] = useState(10);

  const handleZoomChange = useMemo(
    () => throttle((newZoom: number) => setZoom(newZoom), 100),
    []
  );

  const visibleEvents = useMemo(() => {
    const currentTime = currentDate.getTime();
    const timeWindow = timeWindowDays * 24 * 60 * 60 * 1000;

    return events
      .filter((event) => {
        if (!event.location.coordinates) return false;
        const eventTime = event.timestamp;
        const timeDiff = Math.abs(eventTime - currentTime);
        return timeDiff <= timeWindow;
      })
      .map((event) => {
        const eventTime = event.timestamp;
        const timeDiff = Math.abs(eventTime - currentTime);
        const normalizedDistance = timeDiff / timeWindow;
        const scale = 1 - Math.pow(normalizedDistance, 1.5);

        return {
          ...event,
          dynamics: {
            scale: Math.max(0.1, scale),
            temporalDistance: normalizedDistance,
          },
        };
      });
  }, [events, currentDate, timeWindowDays]);

  const clusters = useMemo(() => {
    return createClusters(visibleEvents, zoom);
  }, [visibleEvents, zoom]);

  const { singleMarkers, clusterMarkers } = useMemo(() => {
    const singles: {
      event: EnhancedMapEvent;
      position: { lat: number; lng: number };
    }[] = [];
    const clustered: ClusterGroup[] = [];

    clusters.forEach((cluster) => {
      if (cluster.events.length === 1) {
        singles.push({
          event: cluster.events[0],
          position: cluster.center,
        });
      } else if (zoom >= 12) {
        cluster.events.forEach((event, index) => {
          singles.push({
            event,
            position: cluster.positions[index] || cluster.center,
          });
        });
      } else {
        clustered.push(cluster);
      }
    });

    return { singleMarkers: singles, clusterMarkers: clustered };
  }, [clusters, zoom]);

  return (
    <div className={`w-full h-full ${className}`}>
      <MapContainer
        center={[51.5, 3.8]}
        zoom={10}
        scrollWheelZoom={true}
        className="w-full h-full lg:rounded-lg shadow-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapZoomTracker onZoomChange={handleZoomChange} />

        {singleMarkers.map(({ event, position }) => (
          <SingleMarker
            key={`${event.id}-${position.lat}-${position.lng}`}
            event={event}
            position={position}
          />
        ))}

        {clusterMarkers.map((cluster) => (
          <ClusterMarker key={cluster.id} cluster={cluster} />
        ))}
      </MapContainer>
    </div>
  );
};
