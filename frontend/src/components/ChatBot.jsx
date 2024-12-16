import React from 'react';

const ChatBotWithDocumentAnalyzer = ({
  selectedModel,
  chatQuery,
  setSelectedModel,
  setChatQuery,
  handleChat,
  uploadQuery,
  setUploadQuery,
  handleFileChange,
  handleUpload,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* ChatBot Section */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Chatbot</h2>
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        >
          <option value="Qwen/Qwen2.5-Coder-32B-Instruct/v1/chat/completions">
            Qwen/Qwen2.5-Coder-32B-Instruct/v1/chat/completions
          </option>
          <option value="microsoft/Phi-3.5-mini-instruct/v1/chat/completions">
            microsoft/Phi-3.5-mini-instruct/v1/chat/completions
          </option>
          <option value="google/gemma-2-2b-it/v1/chat/completions">
            google/gemma-2-2b-it/v1/chat/completions
          </option>
        </select>
        <input
          type="text"
          value={chatQuery}
          onChange={(e) => setChatQuery(e.target.value)}
          placeholder="Ask a question..."
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />
        <button
          onClick={handleChat}
          className="w-full p-3 bg-green-500 text-white rounded-lg font-bold"
        >
          Chat
        </button>
      </div>

      {/* Document Analyzer Section */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Analyze Document
        </h2>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />
        <input
          type="text"
          value={uploadQuery}
          onChange={(e) => setUploadQuery(e.target.value)}
          placeholder="Enter query for document analysis..."
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />
        <button
          onClick={handleUpload}
          className="w-full p-3 bg-blue-500 text-white rounded-lg font-bold"
        >
          Upload and Analyze
        </button>
      </div>
    </div>
  );
};

export default ChatBotWithDocumentAnalyzer;
