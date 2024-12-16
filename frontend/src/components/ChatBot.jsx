import React, { useState } from 'react';
import {
  MessageSquare,
  Upload,
  Send,
  Paperclip,
  FileText,
  X,
} from 'lucide-react';

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
  const [showAnalyzer, setShowAnalyzer] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleChat();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      handleFileChange(e);
    }
  };

  const handleKeyPressChat = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleChat();
    }
  };

  const handleKeyPressAnalyzer = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleUpload();
    }
  };

  return (
    <div className="flex flex-col gap-6 bg-gray-100">
      {/* Document Analyzer Section */}
      {showAnalyzer && (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="text-blue-500" size={24} />
              Analyze Document
            </h2>
            <button
              onClick={() => setShowAnalyzer(false)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <label className="block w-full">
              <div className="flex flex-col items-center px-4 py-6 bg-blue-50 text-blue-500 border border-blue-300 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                <Upload size={24} className="mb-2" />
                <span className="text-sm font-semibold">
                  {selectedFile ? selectedFile.name : 'Choose .CSV file'}
                </span>
                <input
                  type="file"
                  onChange={handleFileSelect}
                  className="hidden"
                  accept=".csv"
                />
              </div>
            </label>

            <div className="relative">
              <textarea
                value={uploadQuery}
                onChange={(e) => setUploadQuery(e.target.value)}
                onKeyPress={handleKeyPressAnalyzer} // Add key press handler
                placeholder="Enter query for document analysis..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none min-h-[80px]"
              />
            </div>

            <button
              onClick={handleUpload}
              disabled={!selectedFile}
              className="w-full p-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Upload and Analyze
            </button>
          </div>
        </div>
      )}

      {/* ChatBot Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MessageSquare className="text-green-500" size={24} />
          Chatbot
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <textarea
                value={chatQuery}
                onChange={(e) => setChatQuery(e.target.value)}
                onKeyPress={handleKeyPressChat} // Add key press handler for chat
                placeholder="Ask a question..."
                className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 resize-none min-h-[50px]"
                rows={1}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500 hover:text-green-600 focus:outline-none"
              >
                <Send size={20} />
              </button>
            </div>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
            >
              <option value="Qwen/Qwen2.5-Coder-32B-Instruct/v1/chat/completions">
                Qwen
              </option>
              <option value="microsoft/Phi-3.5-mini-instruct/v1/chat/completions">
                Phi-3.5 Mini
              </option>
              <option value="google/gemma-2-2b-it/v1/chat/completions">
                Gemma-2-2B
              </option>
            </select>
          </div>
        </form>
        <button
          onClick={() => setShowAnalyzer(!showAnalyzer)}
          className="mt-4 flex items-center gap-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <Paperclip size={20} />
          <span className="text-sm">Analyze Document</span>
        </button>
      </div>
    </div>
  );
};

export default ChatBotWithDocumentAnalyzer;
