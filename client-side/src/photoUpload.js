import React, { useState } from 'react';
import './App.css';
import Dropzone from './dropZone';
import axios from 'axios';

const PhotoUpload = ({ onUpload }) => {
  const [noise, setNoise] = useState(0);
  const [scale, setScale] = useState(0);
  const [mode, setMode] = useState('scale');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedPhoto1, setSelectedPhoto1] = useState(null);

  const handleNoiseChange = (e) => {
    setNoise(e.target.value);
  };

  const handleScaleChange = (e) => {
    setScale(e.target.value);
  };

  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  const handlePhotoChange = (files) => {
    if (files && files.length > 0) {
      setSelectedPhoto1(URL.createObjectURL(files[0]));
      setSelectedPhoto(files[0]);
    }
  };

  const downloadFile = (blobData, fileName) => {
    // Create a URL for the blob data received
    const downloadUrl = URL.createObjectURL(blobData);
  
    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName; // Specify the desired file name
    link.click();
  
    // Clean up the URL and link element
    URL.revokeObjectURL(downloadUrl);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('photo', selectedPhoto);
    formData.append('noise', noise);
    formData.append('scale', scale);
    formData.append('mode', mode);

    try {
      const response = await axios.post('/uploads', formData, {
        responseType: 'blob' // Set the response type to 'blob' to receive binary data
      });

      downloadFile(response.data, 'result.jpg');
    } catch (error) {
      console.error('Error uploading and downloading image:', error);
    }

    //onUpload(formData);
  };

  return (
    <div className="photo-upload">
      <Dropzone onDrop={handlePhotoChange} />
      {selectedPhoto && (
        <div className="selected-photo">
          <img className ="selected-photo" src={selectedPhoto1} alt="Selected" />
        </div>
      )}
      <div className="option">
        <label htmlFor="noise">Noise</label>
        <input
          type="range"
          id="noise"
          name="noise"
          min="0"
          max="3"
          value={noise}
          onChange={handleNoiseChange}
        />
        <span className="range-value">{noise}</span>
      </div>
      <div className="option">
        <label htmlFor="scale">Scale</label>
        <input
          type="range"
          id="scale"
          name="scale"
          min="0"
          max="3"
          value={scale}
          onChange={handleScaleChange}
        />
        <span className="range-value">{scale}</span>
      </div>
      <div className="option">
        <label htmlFor="mode">Mode</label>
        <select id="mode" name="mode" value={mode} onChange={handleModeChange}>
          <option value="scale">Scale</option>
          <option value="noise">Noise</option>
          <option value="noise-scale">Noise-Scale</option>
        </select>
      </div>
      <button onClick={handleUpload}>Upload</button>

    </div>
  );
};

export default PhotoUpload;
