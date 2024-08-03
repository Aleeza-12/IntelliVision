import React from 'react';
import './ObjectSegmentation.css';

const ObjectSegmentation = ({ segmentationImage, segmentationResults }) => {
  return (
    <div className="object-segmentation-container">
      <h2>Object Segmentation</h2>
      {segmentationImage && (
        <div>
          <h3>Segmented Image</h3>
          <img src={segmentationImage} alt="Segmented" className="segmentation-image" />
        </div>
      )}
      <div className="segmentation-output">
        {segmentationResults && segmentationResults.length > 0 ? (
          <div>
            <p>Objects</p>
            <ol>
              {segmentationResults.map((result, index) => (
                <li key={index}>
                  {result.class} at Location: {result.location}
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <p>No objects detected.</p>
        )}
      </div>
    </div>
  );
};

export default ObjectSegmentation;
