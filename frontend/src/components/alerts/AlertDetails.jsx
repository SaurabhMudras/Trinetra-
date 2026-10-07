import React from 'react';

const AlertDetails = ({ alert }) => {
  if (!alert) return null;

  return (
    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-100">{alert.title || `Alert #${alert.id}`}</h3>
      <p className="text-sm text-gray-400 mt-2">{alert.description || alert.message}</p>
    </div>
  );
};

export default AlertDetails;
