import React from 'react';

const ApplianceTable = ({ applianceData, toggleApplianceStatus }) => {
  return (
    <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-blue-600 text-white">
          <th className="px-6 py-4 border-b border-gray-200 text-left text-sm font-semibold">
            Appliance
          </th>
          <th className="px-6 py-4 border-b border-gray-200 text-left text-sm font-semibold">
            Energy Consumption
          </th>
          <th className="px-6 py-4 border-b border-gray-200 text-left text-sm font-semibold">
            Time
          </th>
          <th className="px-6 py-4 border-b border-gray-200 text-left text-sm font-semibold">
            Status
          </th>
          <th className="px-6 py-4 border-b border-gray-200 text-center text-sm font-semibold">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {applianceData.map((appliance, index) => (
          <tr key={index}>
            <td className="px-6 py-4 border-b border-gray-200 text-left text-sm">
              {appliance.appliance} ({appliance.room})
            </td>
            <td className="px-6 py-4 border-b border-gray-200 text-left text-sm">
              {appliance.energy_consumption} W
            </td>
            <td className="px-6 py-4 border-b border-gray-200 text-left text-sm">
              {new Date(appliance.time).toLocaleString('id-ID', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </td>
            <td
              className={`px-6 py-4 border-b border-gray-200 text-left text-sm font-semibold ${
                appliance.status === 'Active'
                  ? 'bg-green-100 text-green-600'
                  : 'bg-red-100 text-red-600'
              }`}
            >
              {appliance.status}
            </td>
            <td className="px-6 py-4 border-b border-gray-200 text-center text-sm">
              <button
                onClick={() => toggleApplianceStatus(appliance.appliance)}
                className={`px-4 py-2 rounded-lg text-white ${
                  appliance.status === 'Active'
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-green-500 hover:bg-green-600'
                } transition duration-300`}
              >
                {appliance.status === 'Active' ? 'Turn Off' : 'Turn On'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ApplianceTable;
