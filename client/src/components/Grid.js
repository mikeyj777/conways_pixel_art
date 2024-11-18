// components/Grid.js

import React, { useState, useEffect } from 'react';
import SPGCOL from './SPGCOL';

const GRID_SIZE = 20; // Number of SPGCOLs along one side of the main grid
const SUB_GRID_SIZE = 5; // Size of each SPGCOL (number of cells)
const CELL_SIZE = 4; // Size of each cell within the SPGCOL

function Grid({ imageData }) {
  const [grid, setGrid] = useState([]);

  // Initialize the grid based on image data
  useEffect(() => {
    console.log("in grid.  imageData:", imageData);
    if (imageData.length === 0) return;

    const initialGrid = [];

    for (let y = 0; y < GRID_SIZE; y++) {
      const row = [];
      for (let x = 0; x < GRID_SIZE; x++) {
        // Map the image data to the grid positions
        const imgY = Math.floor((y / GRID_SIZE) * imageData.length);
        const imgX = Math.floor((x / GRID_SIZE) * imageData[0].length);
        const pixelColor = imageData[imgY][imgX];
        row.push({ color: pixelColor });
      }
      initialGrid.push(row);
    }

    setGrid(initialGrid);
  }, [imageData]);

  if (grid.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID_SIZE}, ${SUB_GRID_SIZE * CELL_SIZE}px)`,
        margin: '0 auto',
      }}
    >
      {grid.map((row, y) =>
        row.map((cellData, x) => (
          <SPGCOL
            key={`${x}-${y}`}
            color={cellData.color}
            subGridSize={SUB_GRID_SIZE}
            cellSize={CELL_SIZE}
          />
        ))
      )}
    </div>
  );
}

export default Grid;
