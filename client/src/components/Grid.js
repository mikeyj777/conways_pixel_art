// components/Grid.js

import React, { useState, useEffect, useCallback } from 'react';
import Cell from './Cell';
import { patterns } from '../utils/patterns';
import { mapColorToPattern } from '../utils/colorToPattern';

const GRID_SIZE = 50;
const CELL_SIZE = 12; // Adjusted for better visibility

function Grid({ imageData }) {
  const [grid, setGrid] = useState([]);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(100);

  // Initialize the grid based on image data
  useEffect(() => {
    if (imageData.length === 0) return;

    const initialGrid = Array(GRID_SIZE)
      .fill()
      .map(() =>
        Array(GRID_SIZE).fill({ isAlive: 0, color: '#000' })
      );

    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const pixelColor = imageData[y][x];
        const patternType = mapColorToPattern(pixelColor);
        const pattern = patterns[patternType];
        const color = pixelColor;
        if (pattern) {
          pattern.forEach((row, dy) => {
            row.forEach((value, dx) => {
              const newY = y + dy;
              const newX = x + dx;
              if (
                newY < GRID_SIZE &&
                newX < GRID_SIZE &&
                value === 1
              ) {
                initialGrid[newY][newX] = { isAlive: 1, color };
              }
            });
          });
        }
      }
    }

    setGrid(initialGrid);
  }, [imageData]);

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
                newY < GRID_SIZE &&
                newX >= 0 &&
                newX < GRID_SIZE &&
                g[newY][newX].isAlive
              ) {
                neighbors += 1;
              }
            }
          }

          if (cell.isAlive && (neighbors < 2 || neighbors > 3)) {
            return { isAlive: 0, color: '#000' };
          }
          if (!cell.isAlive && neighbors === 3) {
            return { isAlive: 1, color: cell.color || '#fff' };
          }
          return cell;
        })
      );
    });
  }, []);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(runSimulation, speed);

    return () => clearInterval(interval);
  }, [running, runSimulation, speed]);

  const toggleRunning = () => {
    setRunning(!running);
  };

  const resetGrid = () => {
    setGrid([]);
    setRunning(false);
  };

  if (grid.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
          margin: '0 auto',
        }}
      >
        {grid.flatMap((row, y) =>
          row.map((cell, x) => (
            <Cell
              key={`${x}-${y}`}
              isAlive={cell.isAlive}
              color={cell.color}
            />
          ))
        )}
      </div>
      <div className="controls">
        <button onClick={toggleRunning}>
          {running ? 'Pause Simulation' : 'Start Simulation'}
        </button>
        <button onClick={resetGrid}>Reset</button>
        <div>
          <label>Simulation Speed: </label>
          <input
            type="range"
            min="10"
            max="1000"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
          <span>{speed} ms</span>
        </div>
      </div>
    </div>
  );
}

export default Grid;
