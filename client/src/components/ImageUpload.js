// components/ImageUpload.js

import React from 'react';

function ImageUpload({ setImageFile }) {
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <h2>Upload an Image</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
}

export default ImageUpload;
