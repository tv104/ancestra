import { motion } from "framer-motion";
import { DivIcon } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { memo, useMemo } from "react";
import { ClusterGroup } from "..";
import { getClusterColor } from "../utils";
import styles from "./ClusterMarker.module.css";

export const ClusterMarker = memo<{
  cluster: ClusterGroup;
}>(
  ({ cluster }) => {
    const clusterScale = useMemo(() => {
      const scales = cluster.events.map((e) => e.dynamics.scale);
      return scales.reduce((sum, scale) => sum + scale, 0) / scales.length;
    }, [cluster.events]);

    const icon = useMemo(() => {
      const clusterColor = getClusterColor(cluster.events);
      const size = Math.min(50, 20 + cluster.events.length * 2);
      const fontSize = Math.min(16, 10 + cluster.events.length);

      return new DivIcon({
        html: `<div class="${styles.clusterMarker}" style="background-color: ${clusterColor}; width: ${size}px; height: ${size}px; font-size: ${fontSize}px;">${cluster.events.length}</div>`,
        iconSize: [size, size],
        className: "",
        iconAnchor: [size / 2, size / 2],
      });
    }, [cluster.events]);

    return (
      <div style={{ transform: `scale(${clusterScale})` }}>
        <Marker position={[cluster.center.lat, cluster.center.lng]} icon={icon}>
          <Popup maxWidth={400}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md"
            >
              <h3 className="font-bold text-lg mb-3">
                {cluster.events.length} Events at{" "}
                {cluster.events[0].location.name}
              </h3>
              <div className="max-h-60 overflow-y-auto space-y-0">
                {cluster.events.map((event) => (
                  <div
                    key={event.id}
                    className="border-b border-gray-200 last:border-b-0 flex flex-col gap-0"
                  >
                    <p className="font-medium text-sm my-0!important">
                      {event.event.title}
                    </p>
                    <p className="text-xs text-gray-600">
                      {event.event.formattedDate}
                    </p>
                    <p className="text-xs text-gray-500">
                      {event.person.fullName}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </Popup>
        </Marker>
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.cluster.id !== nextProps.cluster.id) {
      return false;
    }

    const prevScale =
      prevProps.cluster.events.reduce((sum, e) => sum + e.dynamics.scale, 0) /
      prevProps.cluster.events.length;
    const nextScale =
      nextProps.cluster.events.reduce((sum, e) => sum + e.dynamics.scale, 0) /
      nextProps.cluster.events.length;

    const scaleChange = Math.abs(prevScale - nextScale);
    const countChanged =
      prevProps.cluster.events.length !== nextProps.cluster.events.length;

    return countChanged || scaleChange > 0.08;
  }
);
