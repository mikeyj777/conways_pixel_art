// components/Grid.js

import React, { useState, useEffect } from 'react';
import SPGCOL from './SPGCOL';

function Grid({ imageData, settings }) {
  const { gridSize, spgcolSize, cellSize } = settings;
  const [grid, setGrid] = useState([]);

  // Initialize the grid based on image data
  useEffect(() => {
    if (imageData.length === 0) return;

    const initialGrid = [];

    for (let y = 0; y < gridSize; y++) {
      const row = [];
      for (let x = 0; x < gridSize; x++) {
        // Map the image data to the grid positions
        const imgY = Math.floor((y / gridSize) * imageData.length);
        const imgX = Math.floor((x / gridSize) * imageData[0].length);
        const pixelColor = imageData[imgY][imgX];
        row.push({ color: pixelColor });
      }
      initialGrid.push(row);
    }

    setGrid(initialGrid);
  }, [imageData, gridSize]);

  if (grid.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, ${spgcolSize * cellSize}px)`,
        margin: '0 auto',
      }}
    >
      {grid.map((row, y) =>
        row.map((cellData, x) => (
          <SPGCOL
            key={`${x}-${y}`}
            color={cellData.color}
            subGridSize={spgcolSize}
            cellSize={cellSize}
            simSpeed={settings.simSpeed}
          />
        ))
      )}
    </div>
  );
}

export default Grid;
