import React from 'react';
import { FaSearch } from 'react-icons/fa';

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
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Analyze Appliance Data
      </h2>

      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="p-3 mb-3 border border-gray-300 rounded-lg w-full bg-white"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="p-3 mb-3 border border-gray-300 rounded-lg w-full bg-white"
      />

      {/* Analysis Query Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Analysis Query
        </label>
        <div className="relative">
          <input
            type="text"
            value={analysisQuery}
            onChange={(e) => setAnalysisQuery(e.target.value)}
            placeholder="Enter query for analysis..."
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
        </div>
      </div>
      <button
        onClick={handleAnalyze}
        className="p-3 bg-blue-500 text-white font-bold rounded-lg w-full cursor-pointer hover:bg-blue-600"
      >
        Analyze Data
      </button>

      <div className="mt-6 p-6 border border-gray-300 rounded-lg bg-white shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Analysis Result:
        </h3>
        <div>{analysisResponse}</div>
      </div>
    </div>
  );
};

export default AnalysisForm;
