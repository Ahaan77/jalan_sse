import React, { useRef, useState } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import DrawingLayer from './DrawingLayer';
import ExportButton from './ExportButton';
import UploadButton from './UploadButton';
import downloadURI from '../utils/download';
import useImageLoader from '../hooks/useImageLoader';
import useZoom from '../hooks/useZoom';
import useDrawing from '../hooks/useDrawing';
import Konva from 'konva';

const RoofSelector: React.FC = () => {
  const stageRef = useRef<Konva.Stage>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const { image, imageSize } = useImageLoader('/roof.webp', uploadedImageUrl);
  const { zoomLevel, zoomIn, zoomOut } = useZoom();
  const { roofs, currentRoof, startDrawing, draw, stopDrawing, resetDrawing } = useDrawing();

  const handleMouseDown = () => {
    const pos = stageRef.current?.getPointerPosition();
    if (pos) {
      startDrawing(pos, zoomLevel);
    }
  };

  const handleMouseMove = () => {
    const pos = stageRef.current?.getPointerPosition();
    if (pos) {
      draw(pos, zoomLevel);
    }
  };

  const handleExport = () => {
    if (stageRef.current) {
      const uri = stageRef.current.toDataURL();
      downloadURI(uri, 'roof-drawing.png');
    }
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mt-20">
      <p className="w-full flex justify-start text-sm flex items-center gap-1">
        <img className="h-5 w-5" src="/information.svg" alt="info" />
        Drag cursor over the image to draw
      </p>
      <Stage
        width={window.innerWidth / 2}
        height={window.innerHeight / 2}
        scaleX={zoomLevel}
        scaleY={zoomLevel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDrawing}
        ref={stageRef}
      >
        <Layer>
          {image && (
            <KonvaImage
              image={image}
              width={imageSize.width}
              height={imageSize.height}
              x={(window.innerWidth / 4) - (imageSize.width / 2)}
              y={(window.innerHeight / 4) - (imageSize.height / 2)}
            />
          )}
        </Layer>
        <DrawingLayer roofs={roofs} currentRoof={currentRoof} />
      </Stage>
      <div className="w-full flex gap-3 justify-end mt-4">
        <img onClick={zoomIn} className="h-5 w-5 cursor-pointer" src="/zoom-in.svg" alt="zoom-in" />
        <img onClick={zoomOut} className="h-5 w-5 cursor-pointer" src="/zoom-out.svg" alt="zoom-out" />
        <img onClick={resetDrawing} className="h-5 w-5 cursor-pointer" src="/reset.svg" alt="reset" />
      </div>
      <div className="w-full flex justify-center gap-5 items-center mt-10">
        <UploadButton onChange={handleUpload} text="Upload New Image" />
        <ExportButton onClick={handleExport} text="Export Image" />
      </div>
    </div>
  );
};

export default RoofSelector;
