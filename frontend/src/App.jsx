import React, { useState } from 'react';
import axios from 'axios';
import ApplianceTable from './components/ApplianceStatus/ApplianceTable';
import MonitoringDashboard from './components/HomeMonitoring/MonitoringDashboard';
import ApplianceDataTable from './components/ApplianceData/ApplianceDataTable';
import AnalysisForm from './components/Analysis/AnalysisForm';
import ChatBot from './components/Chat/ChatBot';
import DocumentAnalyzer from './components/Document/DocumentAnalyzer';
import { useApplianceData } from './hooks/useApplianceData';

function App() {
  const { applianceData, allApplianceData, toggleApplianceStatus } =
    useApplianceData();
  const [file, setFile] = useState(null);
  const [uploadQuery, setUploadQuery] = useState('');
  const [chatQuery, setChatQuery] = useState('');
  const [response, setResponse] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [analysisQuery, setAnalysisQuery] = useState('');
  const [analysisResponse, setAnalysisResponse] = useState('');
  const [selectedModel, setSelectedModel] = useState(
    'Qwen/Qwen2.5-Coder-32B-Instruct/v1/chat/completions'
  );

  const handleAnalyze = async () => {
    if (!startDate || !endDate || !analysisQuery) {
      alert('Please fill in all fields.');
      return;
    }

    const analyzeData = {
      start_date: startDate,
      end_date: endDate,
      query: analysisQuery,
      model: selectedModel,
    };

    try {
      const res = await axios.post(
        'http://localhost:8080/appliance/analyze',
        analyzeData
      );
      setAnalysisResponse(res.data.result);
    } catch (error) {
      console.error('Error analyzing data:', error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('query', uploadQuery);
    formData.append('model', 'google/tapas-large-finetuned-wtq');

    try {
      const res = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponse(res.data.answer);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleChat = async () => {
    try {
      const res = await axios.post('http://localhost:8080/chat', {
        query: chatQuery,
        model: selectedModel,
      });
      setResponse(res.data.answer);
    } catch (error) {
      console.error('Error querying chat:', error);
    }
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#f4f6f8' }}>
      <div
        style={{
          display: 'flex',
          gap: '20px',
          fontFamily: "'Poppins', sans-serif",
          backgroundColor: '#f4f6f8',
        }}
      >
        {/* Left Column */}
        <div style={{ flex: 1 }}>
          <h2
            style={{
              color: '#212529',
              fontSize: '1.5rem',
              marginBottom: '15px',
            }}
          >
            Appliance Status
          </h2>
          <ApplianceTable
            applianceData={applianceData}
            toggleApplianceStatus={toggleApplianceStatus}
          />

          <h2
            style={{ color: '#212529', fontSize: '1.5rem', marginTop: '20px' }}
          >
            Home Monitoring
          </h2>
          <MonitoringDashboard />
        </div>

        {/* Right Column */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          <div style={{ flex: 1 }}>
            <h2
              style={{
                color: '#212529',
                fontSize: '1.5rem',
                marginBottom: '15px',
              }}
            >
              Appliance Data
            </h2>
            <ApplianceDataTable allApplianceData={allApplianceData} />
          </div>

          <AnalysisForm
            startDate={startDate}
            endDate={endDate}
            analysisQuery={analysisQuery}
            analysisResponse={analysisResponse}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setAnalysisQuery={setAnalysisQuery}
            handleAnalyze={handleAnalyze}
          />
        </div>
      </div>

      {/* Response Section */}
      <div
        style={{
          padding: '20px',
          marginTop: '20px',
          marginBottom: '20px',
          border: '1px solid #ced4da',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2
          style={{ color: '#212529', fontSize: '1.5rem', marginBottom: '15px' }}
        >
          Response
        </h2>
        <p style={{ color: '#495057', fontSize: '1rem', lineHeight: '1.6' }}>
          {response}
        </p>
      </div>

      {/* Bottom Section */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '20px',
          marginBottom: '20px',
        }}
      >
        <ChatBot
          selectedModel={selectedModel}
          chatQuery={chatQuery}
          setSelectedModel={setSelectedModel}
          setChatQuery={setChatQuery}
          handleChat={handleChat}
        />
        <DocumentAnalyzer
          uploadQuery={uploadQuery}
          setUploadQuery={setUploadQuery}
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
        />
      </div>
    </div>
  );
}

export default App;
