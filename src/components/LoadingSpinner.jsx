import React from 'react';

const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <style>
      {`
        .loading-spinner {
          text-align: center;
          padding: 20px;
        }
        .spinner {
          border: 16px solid #f3f3f3;
          border-top: 16px solid #3498db;
          border-radius: 50%;
          width: 120px;
          height: 120px;
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

export default LoadingSpinner;
