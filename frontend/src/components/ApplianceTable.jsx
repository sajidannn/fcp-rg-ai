import React from 'react';

const StatusBadge = ({ status }) => (
  <span
    className={`px-2 py-1 rounded-full text-xs font-medium ${
      status === 'Active'
        ? 'bg-green-100 text-green-800'
        : 'bg-red-100 text-red-800'
    }`}
  >
    {status}
  </span>
);

const AIStatusIndicator = ({ isVisible }) => {
  if (!isVisible) return null;
  return <div className="text-xs text-blue-600 mt-1">AI-suggested change</div>;
};

const ApplianceTable = ({
  applianceData,
  toggleApplianceStatus,
  aiChangedAppliances = [],
}) => {
  const AI_SUPPORTED_APPLIANCES = ['AC', 'Heater', 'Lamp'];

  const isAISupported = (applianceName) => {
    return AI_SUPPORTED_APPLIANCES.includes(applianceName);
  };

  const isAIChanged = (applianceName) => {
    return aiChangedAppliances.includes(applianceName);
  };

  return (
    <div className="overflow-x-auto">
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
            <tr
              key={index}
              className={isAIChanged(appliance.name) ? 'bg-blue-50' : ''}
            >
              <td className="px-6 py-4 border-b border-gray-200 text-left text-sm">
                <div className="flex items-center">
                  <span>
                    {appliance.name} ({appliance.room})
                  </span>
                  {isAISupported(appliance.name) && (
                    <span className="ml-2 text-blue-600" title="AI-Supported">
                      🤖
                    </span>
                  )}
                </div>
                {isAIChanged(appliance.name) && (
                  <AIStatusIndicator isVisible={true} />
                )}
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
              <td className="px-6 py-4 border-b border-gray-200">
                <StatusBadge status={appliance.status} />
              </td>
              <td className="px-6 py-4 border-b border-gray-200 text-center text-sm">
                <button
                  onClick={() => toggleApplianceStatus(appliance.name)}
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
    </div>
  );
};

export default ApplianceTable;
