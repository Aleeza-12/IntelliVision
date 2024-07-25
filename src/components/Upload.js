import React, { useRef } from 'react';
import './Upload.css';

const Upload = () => {
  const fileInputRef = useRef(null);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    console.log('Files uploaded:', files);
    // Handle file upload logic here
  };

  const handleCancelClick = () => {
    console.log('Cancel button clicked');
    // Handle cancel logic here
  };

  const handleUploadClick = () => {
    console.log('Upload button clicked');
    // Handle upload logic here
  };

  return (
    <div className="upload-container">
      <h2>Upload files</h2>
      <div className="upload-box">
        <div className="upload-icon">📁</div>
        <p>Drop files here</p>
        <p>Supported format: PNG, JPG</p>
        <p>OR</p>
        <button className="browse-button" onClick={handleBrowseClick}>Browse files</button>
        <input
          type="file"
          ref={fileInputRef}
          className="file-input"
          onChange={handleFileChange}
          multiple
          style={{ display: 'none' }}
        />
      </div>
      <div className="upload-actions">
        <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
        <button className="upload-button" onClick={handleUploadClick}>Upload</button>
      </div>
    </div>
  );
};

export default Upload;
