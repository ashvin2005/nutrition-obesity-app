import React from 'react';

function ResultsDisplay({ predictions }) {
  const getCategoryColor = (category) => {
    switch(category) {
      case 'Low': return '#4CAF50';
      case 'Medium': return '#FF9800';
      case 'High': return '#F44336';
      default: return '#666';
    }
  };

  return (
    <div className="results-display">
      <h2>📊 Prediction Results</h2>
      
      <div className="result-card">
        <h3>Obesity Risk Category</h3>
        <div 
          className="category-badge"
          style={{ backgroundColor: getCategoryColor(predictions.category) }}
        >
          {predictions.category}
        </div>
      </div>

      <div className="result-card">
        <h3>Predicted Obesity Rate</h3>
        <p className="percentage">{predictions.obesityPercentage}%</p>
        <small>Based on global nutrition patterns</small>
      </div>

      <div className="result-card">
        <h3>Diet Pattern</h3>
        <p>{predictions.cluster}</p>
      </div>

      <div className="result-card">
        <h3>Health Message</h3>
        <p>{predictions.message}</p>
      </div>
    </div>
  );
}

export default ResultsDisplay;