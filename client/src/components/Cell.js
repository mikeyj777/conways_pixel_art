// components/Cell.js

import React from 'react';
import './Cell.css';

function Cell({ isAlive, color, size }) {
  return (
    <div
      className="cell"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: isAlive ? color : '#000',
      }}
    />
  );
}

export default Cell;
