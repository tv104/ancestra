import { DivIcon } from "leaflet";
import { memo, useMemo } from "react";
import { Marker, Popup } from "react-leaflet";
import { EVENT_TYPE_CONFIG } from "@/entities";
import { EnhancedMapEvent } from "../";
import styles from "./SingleMarker.module.css";

export const SingleMarker = memo<{
  event: EnhancedMapEvent;
  position: { lat: number; lng: number };
}>(
  ({ event, position }) => {
    const icon = useMemo(() => {
      const { color, icon: emoji } = EVENT_TYPE_CONFIG[event.event.type];

      return new DivIcon({
        html: `
            <div class="${styles.singleMarker}" style="
              --marker-color: ${color};
            ">
              ${emoji}
            </div>
          `,
        className: "",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });
    }, [event.event.type]);

    return (
      <div style={{ transform: `scale(${event.dynamics.scale})` }}>
        <Marker position={[position.lat, position.lng]} icon={icon}>
          <Popup>
            <div className="max-w-sm">
              <h3 className="font-bold text-lg mb-2">{event.event.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {event.event.formattedDate}
              </p>
              <p className="text-sm mb-2">{event.event.description}</p>
              <div className="text-xs text-gray-500">
                <p>
                  <strong>Person:</strong> {event.person.fullName}
                </p>
                <p>
                  <strong>Location:</strong> {event.location.name}
                </p>
                <p>
                  <strong>Type:</strong> {event.event.type.replace("_", " ")}
                </p>
              </div>
            </div>
          </Popup>
        </Marker>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.event.id === nextProps.event.id &&
      Math.abs(
        prevProps.event.dynamics.scale - nextProps.event.dynamics.scale
      ) < 0.03
    );
  }
);
