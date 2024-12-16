import { useState, useEffect } from 'react';
import axios from 'axios';

export const useApplianceData = () => {
  const [applianceData, setApplianceData] = useState([]);
  const [allApplianceData, setAllApplianceData] = useState([]);

  useEffect(() => {
    const fetchApplianceData = async () => {
      try {
        const appliances = ['AC', 'Heater', 'Lamp', 'TV', 'Refrigerator'];
        const dataPromises = appliances.map((appliance) =>
          axios.get(`http://localhost:8080/appliance/${appliance}`)
        );
        const responses = await Promise.all(dataPromises);
        const fetchedData = responses.map((res) => res.data);
        const cleanData = fetchedData.flat().filter(item => item && Object.keys(item).length > 0);
        setApplianceData(cleanData);
      } catch (error) {
        console.error('Error fetching appliance data:', error);
      }
    };

    const fetchAllApplianceData = async () => {
      try {
        const res = await axios.get('http://localhost:8080/appliance');
        setAllApplianceData(res.data);
      } catch (error) {
        console.error('Error fetching appliance data:', error);
      }
    };

    fetchApplianceData();
    fetchAllApplianceData();
  }, []);

  const toggleApplianceStatus = (appliance, forceStatus = null) => {
    setApplianceData((prevData) =>
      prevData.map((item) => {
        if (item.name === appliance) {
          return {
            ...item,
            status: forceStatus !== null
              ? (forceStatus ? 'Active' : 'Inactive')
              : (item.status === 'Active' ? 'Inactive' : 'Active'),
          };
        }
        return item;
      })
    );
  };


  return {
    applianceData,
    allApplianceData,
    toggleApplianceStatus
  };
};