import React from 'react';

const AIStatusIndicator = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="flex items-center mt-1">
      <span className="text-xs text-blue-600 font-medium animate-pulse">
        ⚡ AI-optimized
      </span>
    </div>
  );
};

export default AIStatusIndicator;
