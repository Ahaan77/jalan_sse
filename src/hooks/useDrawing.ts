import { useState } from 'react';
import { Roof } from '../types';

const useDrawing = () => {
  const [roofs, setRoofs] = useState<Roof[]>([]);
  const [currentRoof, setCurrentRoof] = useState<Roof | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (pos: { x: number; y: number }, zoomLevel: number) => {
    setIsDrawing(true);
    const newLine = { points: [pos.x / zoomLevel, pos.y / zoomLevel] };
    if (currentRoof) {
      setCurrentRoof({
        ...currentRoof,
        lines: [...currentRoof.lines, newLine],
      });
    } else {
      const newRoof: Roof = { id: roofs.length + 1, lines: [newLine] };
      setCurrentRoof(newRoof);
    }
  };

  const draw = (pos: { x: number; y: number }, zoomLevel: number) => {
    if (!isDrawing) return;
    if (currentRoof) {
      const updatedLines = currentRoof.lines.map((line, index) => {
        if (index === currentRoof.lines.length - 1) {
          return {
            ...line,
            points: line.points.concat([pos.x / zoomLevel, pos.y / zoomLevel]),
          };
        }
        return line;
      });

      setCurrentRoof({
        ...currentRoof,
        lines: updatedLines,
      });
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (currentRoof) {
      setRoofs([...roofs, currentRoof]);
      setCurrentRoof(null);
    }
  };

  const resetDrawing = () => {
    setRoofs([]);
    setCurrentRoof(null);
  };

  return { roofs, currentRoof, startDrawing, draw, stopDrawing, resetDrawing, isDrawing };
};

export default useDrawing;
