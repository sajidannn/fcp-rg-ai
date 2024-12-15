import React from 'react';

const ApplianceDataTable = ({ allApplianceData }) => {
  return (
    <div
      style={{
        overflowX: 'auto',
        maxHeight: '370px',
        border: '1px solid #ced4da',
        borderRadius: '5px',
      }}
    >
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: '#ffffff',
          boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                padding: '12px',
                border: '1px solid #ced4da',
                backgroundColor: '#f8f9fa',
                textAlign: 'left',
                position: 'sticky',
                top: 0,
                zIndex: 1,
              }}
            >
              Appliance
            </th>
            <th
              style={{
                padding: '12px',
                border: '1px solid #ced4da',
                backgroundColor: '#f8f9fa',
                textAlign: 'left',
                position: 'sticky',
                top: 0,
                zIndex: 1,
              }}
            >
              Energy Consumption (W)
            </th>
            <th
              style={{
                padding: '12px',
                border: '1px solid #ced4da',
                backgroundColor: '#f8f9fa',
                textAlign: 'left',
                position: 'sticky',
                top: 0,
                zIndex: 1,
              }}
            >
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {allApplianceData.map((appliance, index) => (
            <tr key={index}>
              <td style={{ padding: '12px', border: '1px solid #ced4da' }}>
                {appliance.appliance} ({appliance.room})
              </td>
              <td style={{ padding: '12px', border: '1px solid #ced4da' }}>
                {appliance.energy_consumption} W
              </td>
              <td style={{ padding: '12px', border: '1px solid #ced4da' }}>
                {new Date(appliance.time).toLocaleString('id-ID', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplianceDataTable;
