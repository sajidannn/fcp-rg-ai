import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaThermometerHalf,
  FaTint,
  FaWalking,
  FaLightbulb,
} from 'react-icons/fa'; // Font Awesome icons
import { MdUpdate } from 'react-icons/md'; // Material Design icons

const SensorMonitoring = ({ onDeviceDecision }) => {
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    motion: false,
    light: 0,
    created_at: null,
  });

  const fetchSensorData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/sensor');
      if (response.data && response.data.data) {
        setSensorData(response.data.data);
        await analyzeConditions(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
  };

  const analyzeConditions = async (data) => {
    try {
      const decisions = {};

      // Analyze for AC
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
      decisions.AC = acResponse.data.answer.toLowerCase() === 'yes';

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
      decisions.Heater = heaterResponse.data.answer.toLowerCase() === 'yes';

      // Analyze for Light
      const lightResponse = await axios.post(
        'http://localhost:8080/decision/light',
        {
          light_intensity: parseInt(data.light),
          human_presence: data.motion,
          model: 'google/flan-t5-large',
        }
      );
      decisions.Lamp = lightResponse.data.answer.toLowerCase() === 'yes';

      // Update appliance states based on decisions
      console.log('Decisions:', decisions);
      onDeviceDecision(decisions);
    } catch (error) {
      console.error('Error analyzing conditions:', error);
    }
  };

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 55000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Sensor Data</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg flex items-center">
          <FaThermometerHalf className="text-blue-600 text-3xl mr-4" />
          <div>
            <p className="text-sm text-gray-600">Temperature</p>
            <p className="text-2xl font-bold text-blue-600">
              {sensorData.temperature}°C
            </p>
          </div>
        </div>
        <div className="p-4 bg-green-50 rounded-lg flex items-center">
          <FaTint className="text-green-600 text-3xl mr-4" />
          <div>
            <p className="text-sm text-gray-600">Humidity</p>
            <p className="text-2xl font-bold text-green-600">
              {sensorData.humidity}%
            </p>
          </div>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg flex items-center">
          <FaWalking className="text-yellow-600 text-3xl mr-4" />
          <div>
            <p className="text-sm text-gray-600">Motion Detected</p>
            <p className="text-2xl font-bold text-yellow-600">
              {sensorData.motion ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg flex items-center">
          <FaLightbulb className="text-purple-600 text-3xl mr-4" />
          <div>
            <p className="text-sm text-gray-600">Light Intensity</p>
            <p className="text-2xl font-bold text-purple-600">
              {sensorData.light} lux
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 bg-gray-50 rounded-lg mt-4 flex items-center">
        <MdUpdate className="text-gray-600 text-3xl mr-4" />
        <div>
          <p className="text-sm text-gray-600">Last Updated</p>
          <p className="text-lg font-bold text-gray-800">
            {sensorData.created_at
              ? new Date(sensorData.created_at * 1000).toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })
              : '-'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SensorMonitoring;
