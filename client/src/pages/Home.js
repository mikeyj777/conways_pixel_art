// pages/Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import ImageUpload from '../components/ImageUpload';

function Home({ setImageFile }) {
  return (
    <div className="page">
      <h1>LifeBlock Pixel Art Simulator</h1>
      <p>
        Upload an image to generate pixel art using LifeBlocks and simulate Conway's Game of Life.
      </p>
      <ImageUpload setImageFile={setImageFile} />
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
