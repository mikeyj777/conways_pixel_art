// pages/Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import ImageUpload from '../components/ImageUpload';

function Home({ setImageFile, settings, setSettings }) {
  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  return (
    <div className="page">
      <h1>LifeBlock Pixel Art Simulator</h1>
      <p>
        Upload an image to generate pixel art using LifeBlocks and simulate Conway's Game of Life.
      </p>
      <ImageUpload setImageFile={setImageFile} />
      <div className="settings">
        <h2>Adjust Settings</h2>
        <div>
          <label>Grid Size (Number of SPGCOLs per side): </label>
          <input
            type="number"
            name="gridSize"
            value={settings.gridSize}
            onChange={handleSettingsChange}
            min="10"
            max="100"
          />
        </div>
        <div>
          <label>SPGCOL Size (Number of cells per side): </label>
          <input
            type="number"
            name="spgcolSize"
            value={settings.spgcolSize}
            onChange={handleSettingsChange}
            min="3"
            max="10"
          />
        </div>
        <div>
          <label>Cell Size (pixels): </label>
          <input
            type="number"
            name="cellSize"
            value={settings.cellSize}
            onChange={handleSettingsChange}
            min="2"
            max="20"
          />
        </div>
        <div>
          <label>Simulation Speed (ms): </label>
          <input
            type="number"
            name="simSpeed"
            value={settings.simSpeed}
            onChange={handleSettingsChange}
            min="100"
            max="2000"
          />
        </div>
      </div>
      <Link to="/simulation">
        <button>Proceed to Simulation</button>
      </Link>
      <Link to="/about">
        <button>About</button>
      </Link>
    </div>
  );
}

export default Home;
