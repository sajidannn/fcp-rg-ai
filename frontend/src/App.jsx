import React, { useState } from 'react';
import axios from 'axios';
import ApplianceTable from './components/ApplianceTable';
import MonitoringDashboard from './components/MonitoringDashboard';
import ApplianceDataTable from './components/ApplianceDataTable';
import AnalysisForm from './components/AnalysisForm';
import ChatBotWithDocumentAnalyzer from './components/ChatBot';
import SensorMonitoring from './components/SensorMonitoring';
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

  const handleDeviceDecision = (decisions) => {
    Object.entries(decisions).forEach(([device, shouldBeActive]) => {
      toggleApplianceStatus(device, shouldBeActive);
    });
  };

  const handleAnalyze = async () => {
    if (!startDate || !endDate || !analysisQuery) {
      alert('Please fill in all fields.');
      return;
    }

    const analyzeData = {
      start_date: startDate,
      end_date: endDate,
      query: analysisQuery,
      model: 'google/tapas-large-finetuned-wtq',
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
    <div className="p-6 bg-gray-100">
      <div className="flex gap-6">
        {/* Left Column */}
        <div className="flex-1">
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Appliance Status
            </h2>
            <ApplianceTable
              applianceData={applianceData}
              toggleApplianceStatus={toggleApplianceStatus}
            />

            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-4">
              Home Monitoring
            </h2>
            <MonitoringDashboard />
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full max-w-lg">
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Appliance Data
              </h2>
              <ApplianceDataTable allApplianceData={allApplianceData} />
            </div>

            <div className="mb-6">
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
        </div>
      </div>

      <SensorMonitoring onDeviceDecision={handleDeviceDecision} />

      {/* Response Section */}
      <div className="bg-white p-6 mb-6 border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Response</h2>
        <p className="text-gray-700">{response}</p>
      </div>

      {/* Bottom Section */}
      <ChatBotWithDocumentAnalyzer
        selectedModel={selectedModel}
        chatQuery={chatQuery}
        setSelectedModel={setSelectedModel}
        setChatQuery={setChatQuery}
        handleChat={handleChat}
        uploadQuery={uploadQuery}
        setUploadQuery={setUploadQuery}
        handleFileChange={handleFileChange}
        handleUpload={handleUpload}
      />
    </div>
  );
}

export default App;
