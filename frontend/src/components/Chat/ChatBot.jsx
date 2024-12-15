import React from 'react';

const ChatBot = ({
  selectedModel,
  chatQuery,
  setSelectedModel,
  setChatQuery,
  handleChat,
}) => {
  return (
    <div
      style={{
        flex: 1,
        padding: "20px",
        border: "1px solid #ced4da",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
        maxWidth: "48%",
      }}
    >
      <h2 style={{ color: "#212529", fontSize: "1.5rem", marginBottom: "15px" }}>Chatbot</h2>
      <select
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
        style={{
          padding: "12px",
          marginBottom: "10px",
          border: "1px solid #ced4da",
          borderRadius: "8px",
          backgroundColor: "#ffffff",
          width: "99%",
        }}
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
        onClick={handleChat}
        style={{
          padding: "12px 24px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          width: "100%",
        }}
      >
        Chat
      </button>
    </div>
  );
};

export default ChatBot;