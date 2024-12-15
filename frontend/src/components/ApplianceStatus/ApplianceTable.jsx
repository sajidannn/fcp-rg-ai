import React from 'react';

const ApplianceTable = ({ applianceData, toggleApplianceStatus }) => {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        backgroundColor: "#ffffff",
        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <thead>
        <tr>
          <th
            style={{
              padding: "12px",
              border: "1px solid #ced4da",
              backgroundColor: "#f8f9fa",
              textAlign: "left",
            }}
          >
            Appliance
          </th>
          <th
            style={{
              padding: "12px",
              border: "1px solid #ced4da",
              backgroundColor: "#f8f9fa",
              textAlign: "left",
            }}
          >
            Energy Consumption
          </th>
          <th
            style={{
              padding: "12px",
              border: "1px solid #ced4da",
              backgroundColor: "#f8f9fa",
              textAlign: "left",
            }}
          >
            Time
          </th>
          <th
            style={{
              padding: "12px",
              border: "1px solid #ced4da",
              backgroundColor: "#f8f9fa",
              textAlign: "left",
            }}
          >
            Status
          </th>
          <th
            style={{
              padding: "12px",
              border: "1px solid #ced4da",
              backgroundColor: "#f8f9fa",
              textAlign: "center",
            }}
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {applianceData.map((appliance, index) => (
          <tr key={index}>
            <td
              style={{
                padding: "12px",
                border: "1px solid #ced4da",
                textAlign: "left",
              }}
            >
              {appliance.appliance} ({appliance.room})
            </td>
            <td
              style={{
                padding: "12px",
                border: "1px solid #ced4da",
                textAlign: "left",
              }}
            >
              {appliance.energy_consumption} W
            </td>
            <td
              style={{
                padding: "12px",
                border: "1px solid #ced4da",
                textAlign: "left",
              }}
            >
              {new Date(appliance.time).toLocaleString("id-ID", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </td>
            <td
              style={{
                padding: "12px",
                border: "1px solid #ced4da",
                textAlign: "left",
              }}
            >
              {appliance.status}
            </td>
            <td
              style={{
                padding: "12px",
                border: "1px solid #ced4da",
                textAlign: "center",
              }}
            >
              <button
                onClick={() => toggleApplianceStatus(appliance.appliance)}
                style={{
                  padding: "8px 16px",
                  backgroundColor:
                    appliance.status === "Active" ? "#d9534f" : "#5cb85c",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                {appliance.status === "Active" ? "Turn Off" : "Turn On"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ApplianceTable;