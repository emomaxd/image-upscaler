import React from 'react';
import { useDropzone } from 'react-dropzone';

const Dropzone = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      onDrop(acceptedFiles);
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? 'active' : ''}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the photo here...</p>
      ) : (
        <p>Drag and drop a photo here, or click to select files</p>
      )}
    </div>
  );
};

export default Dropzone;
