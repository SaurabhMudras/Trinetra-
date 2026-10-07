import React from 'react';
import { SEVERITY_COLORS, STATUS_COLORS } from '../../utils/constants';
import { formatDate } from '../../utils/formatters';
import { Link } from 'react-router-dom';

const IncidentTable = ({ incidents = [] }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-800 bg-[#111827]">
      <table className="w-full text-left text-sm text-gray-300">
        <thead className="bg-gray-900/80 text-xs uppercase tracking-wider text-gray-400 border-b border-gray-800">
          <tr>
            <th className="px-6 py-4">ID</th>
            <th className="px-6 py-4">Title</th>
            <th className="px-6 py-4">Severity</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Created At</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {incidents.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                No incidents available.
              </td>
            </tr>
          ) : (
              incidents.map((incident) => (
              <tr key={incident.id} className="hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-blue-400">
                  <Link to={`/incidents/${incident.id}`} className="hover:underline">
                    {String(incident.id).slice(0, 8)}...
                  </Link>
                </td>
                <td className="px-6 py-4 font-medium text-gray-200">
                  <Link to={`/incidents/${incident.id}`} className="hover:text-blue-400">
                    {incident.title}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${SEVERITY_COLORS[String(incident.severity || '').toLowerCase()] || 'bg-gray-800 text-gray-300 border-gray-700'}`}>
                    {incident.severity}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border capitalize ${STATUS_COLORS[String(incident.status || '').toLowerCase()] || 'bg-gray-800 text-gray-300 border-gray-700'}`}>
                    {String(incident.status || '').replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400">{formatDate(incident.created_at)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IncidentTable;
