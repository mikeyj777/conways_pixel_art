// components/Cell.js

import React from 'react';
import './Cell.css';

function Cell({ isAlive, color }) {
  return (
    <div
      className="cell"
      style={{ backgroundColor: isAlive ? color : '#000' }}
    />
  );
}

export default Cell;
