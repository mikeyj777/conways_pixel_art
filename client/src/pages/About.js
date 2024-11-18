// pages/About.js

import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="page">
      <h1>About</h1>
      <p>
        This application allows you to upload an image, generate pixel art using LifeBlocks (patterns from Conway's Game of Life), and simulate the evolution of the grid over time.
      </p>
      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </div>
  );
}

export default About;
