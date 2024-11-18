// components/SPGCOL.js

import React, { useState, useEffect, useCallback } from 'react';
import Cell from './Cell';
import { patterns } from '../utils/patterns';
import { mapColorToPattern } from '../utils/colorToPattern';

function SPGCOL({ color, subGridSize, cellSize }) {
  const [grid, setGrid] = useState(() => initializeSubGrid());
  const [running, setRunning] = useState(true);

  // Initialize the sub-grid with a LifeBlock pattern based on the color
  function initializeSubGrid() {
    const initialGrid = Array(subGridSize)
      .fill()
      .map(() => Array(subGridSize).fill(0));

    const patternType = mapColorToPattern(color);
    const pattern = patterns[patternType];

    if (pattern) {
      const patternHeight = pattern.length;
      const patternWidth = pattern[0].length;
      const offsetY = Math.floor((subGridSize - patternHeight) / 2);
      const offsetX = Math.floor((subGridSize - patternWidth) / 2);

      for (let y = 0; y < patternHeight; y++) {
        for (let x = 0; x < patternWidth; x++) {
          initialGrid[offsetY + y][offsetX + x] = pattern[y][x];
        }
      }
    }

    return initialGrid;
  }

  const runSimulation = useCallback(() => {
    setGrid((g) => {
      return g.map((row, y) =>
        row.map((cell, x) => {
          let neighbors = 0;
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              if (i === 0 && j === 0) continue;
              const newY = y + i;
              const newX = x + j;
              if (
                newY >= 0 &&
                newY < subGridSize &&
                newX >= 0 &&
                newX < subGridSize &&
                g[newY][newX]
              ) {
                neighbors += 1;
              }
            }
          }

          if (cell && (neighbors < 2 || neighbors > 3)) {
            return 0;
          }
          if (!cell && neighbors === 3) {
            return 1;
          }
          return cell;
        })
      );
    });
  }, [subGridSize]);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(runSimulation, 500);

    return () => clearInterval(interval);
  }, [running, runSimulation]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${subGridSize}, ${cellSize}px)`,
      }}
    >
      {grid.map((row, y) =>
        row.map((cell, x) => (
          <Cell
            key={`${x}-${y}`}
            isAlive={cell}
            color={color}
            size={cellSize}
          />
        ))
      )}
    </div>
  );
}

export default SPGCOL;
