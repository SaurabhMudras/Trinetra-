import React, { useEffect, useState } from 'react';
import { AlertOctagon } from 'lucide-react';
import axiosInstance from '../../api/axios';

const RecentIncidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await axiosInstance.get('/api/v1/incidents/');
        const data = Array.isArray(response.data) ? response.data : [];

        // Show only incidents that are currently active
        const activeIncidents = data.filter(
          (incident) =>
            incident.status === 'in_progress' ||
            incident.status === 'open'
        );

        setIncidents(activeIncidents);
      } catch (err) {
        console.error('Failed to fetch incidents:', err);
        setError('Unable to load incidents.');
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  const getSeverityClass = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return 'text-red-400 bg-red-400/10 border-red-400/20';

      case 'high':
        return 'text-orange-400 bg-orange-400/10 border-orange-400/20';

      case 'medium':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';

      case 'low':
        return 'text-green-400 bg-green-400/10 border-green-400/20';

      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-lg">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <AlertOctagon className="w-5 h-5 text-red-400" />

          <h3 className="font-semibold text-gray-200">
            Active Incidents
          </h3>
        </div>

        <span className="text-xs text-gray-500">
          {incidents.length} active
        </span>
      </div>

      {loading && (
        <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-800 text-center text-sm text-gray-400">
          Loading incidents...
        </div>
      )}

      {!loading && error && (
        <div className="p-4 bg-red-950/20 rounded-lg border border-red-900/50 text-center text-sm text-red-400">
          {error}
        </div>
      )}

      {!loading && !error && incidents.length === 0 && (
        <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-800 text-center text-sm text-gray-400">
          No active incidents
        </div>
      )}

      {!loading && !error && incidents.length > 0 && (
        <div className="space-y-3">
          {incidents.slice(0, 5).map((incident) => (
            <div
              key={incident.id}
              className="p-4 bg-gray-900/50 rounded-lg border border-gray-800 hover:border-gray-700 transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h4 className="text-sm font-medium text-gray-200 truncate">
                    {incident.title || 'Untitled Incident'}
                  </h4>

                  <p className="text-xs text-gray-500 mt-1">
                    {incident.description || 'No description available'}
                  </p>
                </div>

                <span
                  className={`shrink-0 px-2 py-1 rounded-md border text-[10px] font-semibold uppercase ${getSeverityClass(
                    incident.severity
                  )}`}
                >
                  {incident.severity || 'unknown'}
                </span>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800">
                <span className="text-[11px] text-gray-500">
                  Source: {incident.source || 'Unknown'}
                </span>

                <span className="text-[11px] text-blue-400 uppercase">
                  {incident.status?.replace('_', ' ') || 'Unknown'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentIncidents;