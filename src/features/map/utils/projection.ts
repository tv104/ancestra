export function projectToPixel(
  lat: number,
  lng: number,
  zoom: number,
  tileSize: number = 256
): { x: number; y: number } {
  const sinLat = Math.sin((lat * Math.PI) / 180);
  const worldSize = tileSize * Math.pow(2, zoom);
  const x = ((lng + 180) / 360) * worldSize;
  const y =
    (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * worldSize;
  return { x, y };
}

export function unprojectFromPixel(
  x: number,
  y: number,
  zoom: number,
  tileSize: number = 256
): { lat: number; lng: number } {
  const worldSize = tileSize * Math.pow(2, zoom);
  const lng = (x / worldSize) * 360 - 180;
  const n = Math.PI - (2 * Math.PI * y) / worldSize;
  const lat = (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  return { lat, lng };
}

export function pixelDistance(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
  zoom: number
): number {
  const pa = projectToPixel(a.lat, a.lng, zoom);
  const pb = projectToPixel(b.lat, b.lng, zoom);
  const dx = pa.x - pb.x;
  const dy = pa.y - pb.y;
  return Math.hypot(dx, dy);
}

export function pixelRadiusToDegreeRadius(
  center: { lat: number; lng: number },
  zoom: number,
  pixelRadius: number
): number {
  const pCenter = projectToPixel(center.lat, center.lng, zoom);
  const pOffsetX = { x: pCenter.x + pixelRadius, y: pCenter.y };
  const pOffsetY = { x: pCenter.x, y: pCenter.y + pixelRadius };
  const lngDelta = Math.abs(
    unprojectFromPixel(pOffsetX.x, pOffsetX.y, zoom).lng - center.lng
  );
  const latDelta = Math.abs(
    unprojectFromPixel(pOffsetY.x, pOffsetY.y, zoom).lat - center.lat
  );
  // Use the larger delta to ensure visible separation when spiderfying
  return Math.max(latDelta, lngDelta);
}
