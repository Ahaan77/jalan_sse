import React from 'react';
import { Layer, Line } from 'react-konva';
import { Roof } from '../types';

interface DrawingLayerProps {
  roofs: Roof[];
  currentRoof: Roof | null;
}

const DrawingLayer: React.FC<DrawingLayerProps> = ({ roofs, currentRoof }) => {
  return (
    <Layer>
      {roofs.map((roof) =>
        roof.lines.map((line, i) => (
          <Line
            key={`${roof.id}-${i}`}
            points={line.points}
            stroke="red"
            strokeWidth={2}
            lineCap="round"
            lineJoin="round"
            closed={i === roof.lines.length - 1} // Close the last line
          />
        ))
      )}
      {currentRoof &&
        currentRoof.lines.map((line, i) => (
          <Line
            key={`current-${i}`}
            points={line.points}
            stroke="red"
            strokeWidth={2}
            lineCap="round"
            lineJoin="round"
            closed={i === currentRoof.lines.length - 1} // Close the last line
          />
        ))}
    </Layer>
  );
};

export default DrawingLayer;
