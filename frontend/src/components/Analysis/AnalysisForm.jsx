import React from 'react';

const AnalysisForm = ({
  startDate,
  endDate,
  analysisQuery,
  analysisResponse,
  setStartDate,
  setEndDate,
  setAnalysisQuery,
  handleAnalyze,
}) => {
  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ced4da",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ color: "#212529", fontSize: "1.5rem", marginBottom: "15px" }}>Analyze Appliance Data</h2>

      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        style={{
          padding: "12px",
          marginBottom: "10px",
          border: "1px solid #ced4da",
          borderRadius: "8px",
          backgroundColor: "#ffffff",
          width: "95%",
        }}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        style={{
          padding: "12px",
          marginBottom: "10px",
          border: "1px solid #ced4da",
          borderRadius: "8px",
          backgroundColor: "#ffffff",
          width: "95%",
        }}
      />
      <input
        type="text"
        value={analysisQuery}
        onChange={(e) => setAnalysisQuery(e.target.value)}
        placeholder="Enter query for analysis..."
        style={{
          padding: "12px",
          marginBottom: "10px",
          border: "1px solid #ced4da",
          borderRadius: "8px",
          backgroundColor: "#ffffff",
          width: "95%",
        }}
      />
      <button
        onClick={handleAnalyze}
        style={{
          padding: "12px 24px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          width: "100%",
        }}
      >
        Analyze Data
      </button>
      
      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          border: "1px solid #ced4da",
          borderRadius: "8px",
          backgroundColor: "#ffffff",
          boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 style={{ color: "#212529", fontSize: "1.25rem", marginBottom: "10px" }}>
          Analysis Result:
        </h3>
        {analysisResponse}
      </div>
    </div>
  );
};

export default AnalysisForm;