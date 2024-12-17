import React from 'react';

const MonitoringDashboard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4">
      <iframe
        className="w-full h-52 border border-gray-300 rounded-lg shadow-md"
        src="https://thingspeak.com/channels/2785872/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=Sensor+Temperature+Rumah&type=line"
        title="Temperature"
      ></iframe>
      <iframe
        className="w-full h-52 border border-gray-300 rounded-lg shadow-md"
        src="https://thingspeak.com/channels/2785872/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=Sensor+Kelembapan+Rumah&type=line"
        title="Humidity"
      ></iframe>
      <iframe
        className="w-full h-52 border border-gray-300 rounded-lg shadow-md"
        src="https://thingspeak.com/channels/2785872/charts/4?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=Sensor+Intensitas+Cahaya&type=line"
        title="Light Intensity"
      ></iframe>
      <iframe
        className="w-full h-52 border border-gray-300 rounded-lg shadow-md"
        src="https://thingspeak.com/channels/2785872/charts/3?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=Sensor+Gerak&type=step"
        title="Human Presence"
      ></iframe>
    </div>
  );
};

export default MonitoringDashboard;
