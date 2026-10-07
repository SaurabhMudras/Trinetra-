import React from 'react';
import { SEVERITY_COLORS, STATUS_COLORS } from '../../utils/constants';
import { formatDate } from '../../utils/formatters';
import { Link } from 'react-router-dom';

const AlertTable = ({ alerts = [] }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-800 bg-[#111827]">
      <table className="w-full text-left text-sm text-gray-300">
        <thead className="bg-gray-900/80 text-xs uppercase tracking-wider text-gray-400 border-b border-gray-800">
          <tr>
            <th className="px-6 py-4">Alert ID</th>
            <th className="px-6 py-4">Title</th>
            <th className="px-6 py-4">Source</th>
            <th className="px-6 py-4">Severity</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Timestamp</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {alerts.length === 0 ? (
            <tr>
              <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                No alerts detected.
              </td>
            </tr>
          ) : (
            alerts.map((alert) => (
              <tr key={alert.id} className="hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-blue-400">
                  <Link to={`/alerts/${alert.id}`} className="hover:underline">
                    {String(alert.id).slice(0, 8)}...
                  </Link>
                </td>
                <td className="px-6 py-4 text-gray-200">
                  <Link to={`/alerts/${alert.id}`} className="hover:text-blue-400">
                    {alert.title}
                  </Link>
                </td>
                <td className="px-6 py-4 text-gray-300">{alert.source}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${SEVERITY_COLORS[String(alert.severity || '').toLowerCase()] || 'bg-gray-800 text-gray-300'}`}>
                    {alert.severity}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border capitalize ${STATUS_COLORS[String(alert.status || '').toLowerCase()] || 'bg-gray-800 text-gray-300'}`}>
                    {String(alert.status || '').replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400">{formatDate(alert.created_at)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AlertTable;
