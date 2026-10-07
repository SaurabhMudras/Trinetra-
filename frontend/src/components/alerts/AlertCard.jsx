import React from 'react';

const AlertCard = ({ alert }) => {
  if (!alert) return null;

  return (
    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-lg">
      <h4 className="font-semibold text-gray-100">{alert.title || alert.source}</h4>
      <p className="text-sm text-gray-400 mt-2">{alert.description || alert.message}</p>
    </div>
  );
};

export default AlertCard;
