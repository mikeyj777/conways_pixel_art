// pages/Simulation.js

import React from 'react';
import Grid from '../components/Grid';
import { Link } from 'react-router-dom';
import useImageProcessor from '../components/ImageProcessor';

function Simulation({ imageFile, settings }) {
  const imageData = useImageProcessor(imageFile, settings.gridSize);

  if (!imageFile) {
    return (
      <div className="page">
        <h1>No Image Uploaded</h1>
        <Link to="/">
          <button>Back to Home</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Simulation</h1>
      <Grid imageData={imageData} settings={settings} />
      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </div>
  );
}

export default Simulation;
