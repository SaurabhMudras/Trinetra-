import React from 'react';

const IncidentDetails = ({ incident }) => {
  if (!incident) return null;

  return (
    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-100">{incident.title}</h3>
      <p className="text-sm text-gray-400 mt-2">{incident.description}</p>
    </div>
  );
};

export default IncidentDetails;
