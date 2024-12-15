import React from 'react';

const MonitoringDashboard = () => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
      <iframe
        width="100%"
        height="200"
        style={{ border: "1px solid #cccccc" }}
        src="https://thingspeak.com/channels/2785872/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"
        title="Temperature"
      ></iframe>
      <iframe
        width="100%"
        height="200"
        style={{ border: "1px solid #cccccc" }}
        src="https://thingspeak.com/channels/2785872/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"
        title="Humidity"
      ></iframe>
      <iframe
        width="100%"
        height="200"
        style={{ border: "1px solid #cccccc" }}
        src="https://thingspeak.com/channels/2785872/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"
        title="Light Intensity"
      ></iframe>
      <iframe
        width="100%"
        height="200"
        style={{ border: "1px solid #cccccc" }}
        src="https://thingspeak.com/channels/2785872/charts/3?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=step"
        title="Human Presence"
      ></iframe>
    </div>
  );
};

export default MonitoringDashboard;