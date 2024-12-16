import React from 'react';

const StatusBadge = ({ status }) => {
  const baseClasses = 'px-2 py-1 rounded-full text-xs font-semibold';
  const statusClasses =
    status === 'Active'
      ? 'bg-green-100 text-green-600'
      : 'bg-red-100 text-red-600';

  return <span className={`${baseClasses} ${statusClasses}`}>{status}</span>;
};

export default StatusBadge;
