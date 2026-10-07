import React from 'react';

const IncidentCard = ({ incident }) => {
  if (!incident) return null;

  return (
    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-lg">
      <h4 className="font-semibold text-gray-100">{incident.title}</h4>
      <p className="text-sm text-gray-400 mt-2">{incident.description}</p>
    </div>
  );
};

export default IncidentCard;
