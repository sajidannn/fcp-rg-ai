import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [uploadQuery, setUploadQuery] = useState("");
  const [chatQuery, setChatQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("query", uploadQuery);

    try {
      const res = await axios.post("http://localhost:8080/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResponse(res.data.answer); // Assuming the response has an 'answer' field
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleChat = async () => {
    try {
      const res = await axios.post("http://localhost:8080/chat", { query: chatQuery });
      setResponse(res.data.answer);
    } catch (error) {
      console.error("Error querying chat:", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        padding: "30px",
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#f4f6f8",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
      }}
    >
      <h1 style={{ color: "#212529", marginBottom: "25px", fontSize: "2rem", fontWeight: "600" }}>Data Analysis Chatbot</h1>
      <div style={{ marginBottom: "25px" }}>
        <input
          type="file"
          onChange={handleFileChange}
          style={{
            padding: "12px",
            marginBottom: "10px",
            border: "1px solid #ced4da",
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            width: "100%",
          }}
        />
        <input
          type="text"
          value={uploadQuery}
          onChange={(e) => setUploadQuery(e.target.value)}
          placeholder="Enter query for document analysis..."
          style={{
            padding: "12px",
            marginBottom: "10px",
            border: "1px solid #ced4da",
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            width: "100%",
          }}
        />
        <button
          onClick={handleUpload}
          style={{
            padding: "12px 24px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Upload and Analyze
        </button>
      </div>
      <div style={{ marginBottom: "25px" }}>
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
            width: "100%",
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
          }}
        >
          Chat
        </button>
      </div>
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
        <h2 style={{ color: "#212529", fontSize: "1.5rem", marginBottom: "15px" }}>Response</h2>
        <p style={{ color: "#495057", fontSize: "1rem", lineHeight: "1.6" }}>{response}</p>
      </div>
    </div>
  );
}

export default App;
