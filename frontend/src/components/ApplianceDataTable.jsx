import React from 'react';

const ApplianceDataTable = ({ allApplianceData }) => {
  return (
    <div className="overflow-x-auto max-h-[465px] border border-gray-300 rounded-lg shadow-lg">
      <table className="w-full border-collapse bg-white text-sm text-gray-700">
        <thead className="sticky top-0 z-10 bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
          <tr>
            <th className="px-6 py-3 border-b border-gray-300 text-left font-semibold">
              Appliance
            </th>
            <th className="px-6 py-3 border-b border-gray-300 text-left font-semibold">
              Energy Consumption (W)
            </th>
            <th className="px-6 py-3 border-b border-gray-300 text-left font-semibold">
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {allApplianceData.map((appliance, index) => (
            <tr
              key={index}
              className={`transition-all duration-300 ease-in-out ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              } hover:bg-gray-200`}
            >
              <td className="px-6 py-4 border-b border-gray-300">
                {appliance.name} ({appliance.room})
              </td>
              <td className="px-6 py-4 border-b border-gray-300">
                {appliance.energy_consumption} W
              </td>
              <td className="px-6 py-4 border-b border-gray-300">
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
