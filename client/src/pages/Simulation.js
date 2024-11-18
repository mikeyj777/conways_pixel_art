// pages/Simulation.js

import React from 'react';
import Grid from '../components/Grid';
import { Link } from 'react-router-dom';
import useImageProcessor from '../components/ImageProcessor';

function Simulation({ imageFile }) {
  const imageData = useImageProcessor(imageFile);

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
      <Grid imageData={imageData} />
      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </div>
  );
}

export default Simulation;
