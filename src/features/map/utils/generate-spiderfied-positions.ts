export const generateSpiderfiedPositions = (
  center: { lat: number; lng: number },
  count: number,
  radius: number
): { lat: number; lng: number }[] => {
  if (count === 1) return [center];

  const positions: { lat: number; lng: number }[] = [];
  const angleStep = (2 * Math.PI) / count;
  const spiderRadius = radius * 2;

  for (let i = 0; i < count; i++) {
    const angle = angleStep * i;
    const lat = center.lat + Math.cos(angle) * spiderRadius;
    const lng = center.lng + Math.sin(angle) * spiderRadius;
    positions.push({ lat, lng });
  }

  return positions;
};
  