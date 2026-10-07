import React, { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import axiosInstance from '../../api/axios';

const RecentAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await axiosInstance.get('/api/v1/alerts/');
        const data = Array.isArray(response.data) ? response.data : [];

        setAlerts(data);
      } catch (err) {
        console.error('Failed to fetch alerts:', err);
        setError('Unable to load alerts.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
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
          <AlertTriangle className="w-5 h-5 text-amber-400" />

          <h3 className="font-semibold text-gray-200">
            Recent System Alerts
          </h3>
        </div>

        <span className="text-xs text-gray-500">
          {alerts.length}
        </span>
      </div>

      {loading && (
        <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-800 text-center text-sm text-gray-400">
          Loading alerts...
        </div>
      )}

      {!loading && error && (
        <div className="p-4 bg-red-950/20 rounded-lg border border-red-900/50 text-center text-sm text-red-400">
          {error}
        </div>
      )}

      {!loading && !error && alerts.length === 0 && (
        <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-800 text-center text-sm text-gray-400">
          No recent unhandled alerts
        </div>
      )}

      {!loading && !error && alerts.length > 0 && (
        <div className="space-y-3">
          {alerts.slice(0, 5).map((alert) => (
            <div
              key={alert.id}
              className="p-4 bg-gray-900/50 rounded-lg border border-gray-800 hover:border-gray-700 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="text-sm font-medium text-gray-200 truncate">
                    {alert.title || 'System Alert'}
                  </h4>

                  <p className="text-xs text-gray-500 mt-1">
                    {alert.description || 'No description available'}
                  </p>
                </div>

                <span
                  className={`shrink-0 px-2 py-1 rounded-md border text-[10px] font-semibold uppercase ${getSeverityClass(
                    alert.severity
                  )}`}
                >
                  {alert.severity || 'unknown'}
                </span>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800">
                <span className="text-[11px] text-gray-500">
                  Source: {alert.source || 'Unknown'}
                </span>

                <span className="text-[11px] text-blue-400 uppercase">
                  {alert.status?.replace('_', ' ') || 'Unknown'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentAlerts;