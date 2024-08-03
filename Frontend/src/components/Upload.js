import React, { useRef, useState } from 'react';
import axios from 'axios';
import './Upload.css';

const Upload = ({ onDetection, onSegmentation }) => {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState(null);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setImageError('Please select an image file.');
      return;
    }

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setImageError('Only JPG and PNG images are supported.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImageError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadClick = async () => {
    const file = fileInputRef.current.files[0];

    if (!file) {
      setImageError('Please select an image file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const detectionResponse = await axios.post('http://127.0.0.1:5000/predict/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const { image, objects } = detectionResponse.data;
      onDetection(objects, `data:image/jpeg;base64,${image}`);

      const segmentationResponse = await axios.post('http://127.0.0.1:5000/predict_segmentation/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const { image: segImage, results } = segmentationResponse.data;
      onSegmentation(results, `data:image/jpeg;base64,${segImage}`);
    } catch (error) {
      console.error('Error uploading image:', error);
      setImageError('An error occurred during upload. Please try again.');
    }
  };

  const handleCancelClick = () => {
    setImagePreview(null);
    onDetection([], null);
    onSegmentation([], null);
  };

  return (
    <div className="upload-container">
      <h2>Upload files</h2>
      <div className="upload-box">
        <div className="upload-icon"></div>
        <p>Drop files here</p>
        <p>Supported format: PNG, JPG</p>
        <p>OR</p>
        <button className="browse-button" onClick={handleBrowseClick}>
          Browse files
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="file-input"
          onChange={handleFileChange}
          multiple={false}
        />
      </div>
      <div className="upload-actions">
        <button className="cancel-button" onClick={handleCancelClick}>
          Cancel
        </button>
        <button className="upload-button" onClick={handleUploadClick}>
          Upload
        </button>
      </div>
      {imagePreview && (
        <div>
          <h3>Image Preview</h3>
          <img src={imagePreview} alt="Preview of uploaded image" />
        </div>
      )}
      {imageError && <p className="error-message">{imageError}</p>}
    </div>
  );
};

export default Upload;
