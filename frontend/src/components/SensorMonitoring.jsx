import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SensorMonitoring = ({ onDeviceDecision }) => {
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    motion: false,
    created_at: null,
  });

  const fetchSensorData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/sensor');
      setSensorData(response.data.data);
      analyzeConditions(response.data.data);
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
  };

  const analyzeConditions = async (data) => {
    try {
      // Analyze for AC
      console.log('Analyzing conditions:', data);
      const acResponse = await axios.post(
        'http://localhost:8080/decision/temperature',
        {
          temperature: parseInt(data.temperature),
          humidity: parseInt(data.humidity),
          human_presence: data.motion,
          appliance: 'AC',
          model: 'google/flan-t5-large',
        }
      );

      // Analyze for Heater
      const heaterResponse = await axios.post(
        'http://localhost:8080/decision/temperature',
        {
          temperature: parseInt(data.temperature),
          humidity: parseInt(data.humidity),
          human_presence: data.motion,
          appliance: 'heater',
          model: 'google/flan-t5-large',
        }
      );

      console.log('human_presence:', data.motion);
      // Update appliance states based on decisions
      onDeviceDecision({
        AC: acResponse.data.answer === 'Yes',
        Heater: heaterResponse.data.answer === 'Yes',
      });
      console.log('AC Decision:', acResponse.data.answer);
      console.log('Heater Decision:', heaterResponse.data.answer);
    } catch (error) {
      console.error('Error analyzing conditions:', error);
    }
  };

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 15000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Sensor Data</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600">Temperature</p>
          <p className="text-2xl font-bold text-blue-600">
            {sensorData.temperature}°C
          </p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-gray-600">Humidity</p>
          <p className="text-2xl font-bold text-green-600">
            {sensorData.humidity}%
          </p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-gray-600">Motion Detected</p>
          <p className="text-2xl font-bold text-yellow-600">
            {sensorData.motion ? 'Yes' : 'No'}
          </p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-gray-600">Last Updated</p>
          <p className="text-lg font-bold text-purple-600">
            {sensorData.created_at
              ? new Date(sensorData.created_at * 1000).toLocaleTimeString()
              : '-'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SensorMonitoring;
