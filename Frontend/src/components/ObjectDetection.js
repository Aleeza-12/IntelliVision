import React from 'react';
import './ObjectDetection.css';

const ObjectDetection = ({ detectedObjects = [], imagePreview }) => {
  return (
    <div className="object-detection-container">
      <h2>Object Recognition</h2>
      {imagePreview && (
        <div>
          <h3>Detected Image</h3>
          <img src={imagePreview} alt="Detected" style={{ maxWidth: '100%' }} />
        </div>
      )}
      {detectedObjects.length > 0 ? (
        <div className="detection-output">
          <h3>Objects</h3>
          <ul>
            {detectedObjects.map((obj, index) => (
              <li key={index}>
                {obj.class} at ({obj.bbox.join(', ')}) with {obj.confidence.toFixed(2)} confidence
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>No objects detected.</div>
      )}
    </div>
  );
};

export default ObjectDetection;
