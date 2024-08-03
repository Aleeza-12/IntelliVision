import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Upload from './components/Upload';
import ObjectSegmentation from './components/ObjectSegmentation';
import ObjectDetection from './components/ObjectDetection';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [detectedObjects, setDetectedObjects] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [segmentationImage, setSegmentationImage] = useState(null);
  const [segmentationResults, setSegmentationResults] = useState([]);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleSignupClick = () => {
    setShowSignup(true);
  };

  const handleClose = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleDetection = (objects, image) => {
    setDetectedObjects(objects);
    setImagePreview(image);
  };

  const handleSegmentation = (results, image) => {
    setSegmentationResults(results);
    setSegmentationImage(image);
  };

  return (
    <div className="app">
      <Navbar onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
      <div className="main-content">
        <Upload onDetection={handleDetection} onSegmentation={handleSegmentation} />
        <ObjectSegmentation 
          segmentationImage={segmentationImage} 
          segmentationResults={segmentationResults} 
        />
        <ObjectDetection detectedObjects={detectedObjects} imagePreview={imagePreview} />
      </div>
      <Footer />
      {showLogin && <Login onClose={handleClose} />}
      {showSignup && <Signup onClose={handleClose} />}
    </div>
  );
};

export default App;
