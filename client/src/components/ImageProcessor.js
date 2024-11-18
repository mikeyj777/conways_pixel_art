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

      // Adjust the canvas size to match the image aspect ratio
      const imgWidth = img.width;
      const imgHeight = img.height;
      const canvasSize = 50; // Adjust as needed
      const aspectRatio = imgWidth / imgHeight;

      canvas.width = canvasSize;
      canvas.height = canvasSize / aspectRatio;

      context.drawImage(img, 0, 0, canvas.width, canvas.height);

      const imgData = context.getImageData(0, 0, canvas.width, canvas.height).data;

      const pixelData = [];

      for (let y = 0; y < canvas.height; y++) {
        const row = [];
        for (let x = 0; x < canvas.width; x++) {
          const index = (y * canvas.width + x) * 4;
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
