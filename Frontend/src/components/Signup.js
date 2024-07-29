import React from 'react';
import './SignUp.css';

const Signup = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Signup</h2>
        <form>
          <div className="form-group">
            <label>Username:</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" />
          </div>
          <div className="form-actions">
            <button type="submit">Signup</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
