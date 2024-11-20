// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Simulation from './pages/Simulation';
import About from './pages/About';

function App() {
  const [imageFile, setImageFile] = useState(null);
  const [settings, setSettings] = useState({
    gridSize: 50,      // Default grid size (number of SPGCOLs per side)
    spgcolSize: 5,     // Default SPGCOL size (number of cells per side)
    cellSize: 4,       // Default cell size (pixels)
    simSpeed: 500,     // Default simulation speed (ms)
  });

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home setImageFile={setImageFile} settings={settings} setSettings={setSettings} />}
        />
        <Route
          path="/simulation"
          element={<Simulation imageFile={imageFile} settings={settings} />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
