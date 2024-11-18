// components/ImageProcessor.js

import { useEffect, useState } from 'react';

function useImageProcessor(imageFile) {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    if (!imageFile) return;

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.width = 50;
      canvas.height = 50;

      context.drawImage(img, 0, 0, 50, 50);

      const imgData = context.getImageData(0, 0, 50, 50).data;

      const pixelData = [];

      for (let y = 0; y < 50; y++) {
        const row = [];
        for (let x = 0; x < 50; x++) {
          const index = (y * 50 + x) * 4;
          const r = imgData[index];
          const g = imgData[index + 1];
          const b = imgData[index + 2];
          const color = `rgb(${r},${g},${b})`;
          row.push(color);
        }
        pixelData.push(row);
      }

      setImageData(pixelData);
    };

    reader.readAsDataURL(imageFile);
  }, [imageFile]);

  return imageData;
}

export default useImageProcessor;
