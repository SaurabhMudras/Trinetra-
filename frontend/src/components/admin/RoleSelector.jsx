import React from 'react';

const RoleSelector = ({ currentRole, onChange }) => {
  return (
    <select
      value={currentRole}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-200 focus:outline-none focus:border-blue-500"
    >
      <option value="admin">Admin</option>
      <option value="soc_analyst">SOC Analyst</option>
      <option value="threat_researcher">Threat Researcher</option>
      <option value="incident_responder">Incident Responder</option>
      <option value="viewer">Viewer</option>
    </select>
  );
};

export default RoleSelector;
