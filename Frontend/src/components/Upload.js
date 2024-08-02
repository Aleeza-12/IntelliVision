import React, { useRef, useState } from 'react';
import axios from 'axios';
import './Upload.css';

const Upload = ({ onDetection }) => {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = async () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://127.0.0.1:5000/model/predict/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const { image, objects } = response.data;
        onDetection(objects, `data:image/jpeg;base64,${image}`);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleCancelClick = () => {
    setImagePreview(null);
    onDetection([], null);
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
      {imagePreview && (
        <div>
          <h3>Image Preview</h3>
          <img src={imagePreview} alt="Preview of uploaded image" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default Upload;
