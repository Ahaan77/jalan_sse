import { useState } from 'react';

const useZoom = (initialZoom: number = 1, minZoom: number = 1, maxZoom: number = 3) => {
  const [zoomLevel, setZoomLevel] = useState(initialZoom);

  const zoomIn = () => setZoomLevel(prevZoom => Math.min(prevZoom + 0.1, maxZoom));
  const zoomOut = () => setZoomLevel(prevZoom => Math.max(prevZoom - 0.1, minZoom));

  return { zoomLevel, zoomIn, zoomOut };
};

export default useZoom;
