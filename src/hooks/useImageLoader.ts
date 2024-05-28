import useImage from 'use-image';
import { useEffect, useState } from 'react';

interface ImageSize {
  width: number;
  height: number;
  scale: number;
}

const useImageLoader = (defaultImageUrl: string, uploadedImageUrl?: string | null) => {
  const [defaultImage] = useImage(defaultImageUrl);
  const [uploadedImage] = useImage(uploadedImageUrl || defaultImageUrl);
  const [imageSize, setImageSize] = useState<ImageSize>({ width: 0, height: 0, scale: 1 });

  useEffect(() => {
    if (uploadedImage) {
      const img = uploadedImage as HTMLImageElement;
      const aspectRatio = img.width / img.height;
      const viewportWidth = window.innerWidth / 2;
      const viewportHeight = window.innerHeight / 2;
      let width = viewportWidth;
      let height = viewportHeight;

      if (aspectRatio > 1) {
        height = width / aspectRatio;
      } else {
        width = height * aspectRatio;
      }

      setImageSize({
        width,
        height,
        scale: Math.min(viewportWidth / img.width, viewportHeight / img.height),
      });
    }
  }, [uploadedImage]);

  return { image: uploadedImage, imageSize };
};

export default useImageLoader;
