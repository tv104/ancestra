import { useEffect } from "react";
import { useMap } from "react-leaflet";

export const MapZoomTracker: React.FC<{
  onZoomChange: (zoom: number) => void;
}> = ({ onZoomChange }) => {
  const map = useMap();

  useEffect(() => {
    const handleZoom = () => {
      onZoomChange(map.getZoom());
    };

    map.on("zoomend", handleZoom);
    handleZoom();

    return () => {
      map.off("zoomend", handleZoom);
    };
  }, [map, onZoomChange]);

  return null;
};
