import React from 'react';

const DocumentAnalyzer = ({
  uploadQuery,
  setUploadQuery,
  handleFileChange,
  handleUpload,
}) => {
  return (
    <div
      style={{
        flex: 1,
        padding: '20px',
        border: '1px solid #ced4da',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '48%',
      }}
    >
      <h2
        style={{ color: '#212529', fontSize: '1.5rem', marginBottom: '15px' }}
      >
        Analyze Document
      </h2>
      <input
        type="file"
        onChange={handleFileChange}
        style={{
          padding: '12px',
          marginBottom: '10px',
          border: '1px solid #ced4da',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          width: '95%',
        }}
      />
      <input
        type="text"
        value={uploadQuery}
        onChange={(e) => setUploadQuery(e.target.value)}
        placeholder="Enter query for document analysis..."
        style={{
          padding: '12px',
          marginBottom: '10px',
          border: '1px solid #ced4da',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          width: '95%',
        }}
      />
      <button
        onClick={handleUpload}
        style={{
          padding: '12px 24px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          width: '100%',
        }}
      >
        Upload and Analyze
      </button>
    </div>
  );
};

export default DocumentAnalyzer;
