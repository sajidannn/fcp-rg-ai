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
      <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
        Analyze Appliance Data
      </h2>

      {/* Date Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg w-full bg-white focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg w-full bg-white focus:ring-2 focus:ring-blue-500"
        />
      </div>

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

      {/* Analyze Button */}
      <button
        onClick={handleAnalyze}
        className="p-3 bg-blue-500 text-white font-bold rounded-lg w-full md:w-1/2 mx-auto block cursor-pointer hover:bg-blue-600 transition duration-300"
      >
        Analyze Data
      </button>

      {/* Analysis Result Section */}
      <div className="mt-6 p-4 sm:p-6 border border-gray-300 rounded-lg bg-white shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">
          Analysis Result:
        </h3>
        <div className="text-gray-700 break-words">
          {analysisResponse || 'No result available.'}
        </div>
      </div>
    </div>
  );
};

export default AnalysisForm;
