// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Simulation from './pages/Simulation';
import About from './pages/About';

function App() {
  const [imageFile, setImageFile] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setImageFile={setImageFile} />} />
        <Route path="/simulation" element={<Simulation imageFile={imageFile} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
