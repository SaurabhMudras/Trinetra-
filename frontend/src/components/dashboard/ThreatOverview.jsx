import React, { useEffect, useMemo, useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
} from 'lucide-react';
import axiosInstance from '../../api/axios';

const ThreatOverview = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await axiosInstance.get('/api/v1/incidents/');

        const data = Array.isArray(response.data)
          ? response.data
          : [];

        setIncidents(data);
      } catch (err) {
        console.error('Failed to fetch threat data:', err);
        setError('Unable to load threat data.');
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  const threatStats = useMemo(() => {
    const stats = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
    };

    incidents.forEach((incident) => {
      const severity = incident.severity?.toLowerCase();

      if (severity && stats[severity] !== undefined) {
        stats[severity]++;
      }
    });

    return stats;
  }, [incidents]);

  const totalThreats =
    threatStats.critical +
    threatStats.high +
    threatStats.medium +
    threatStats.low;

  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'critical':
        return {
          text: 'text-red-400',
          bg: 'bg-red-400/10',
          border: 'border-red-400/20',
        };

      case 'high':
        return {
          text: 'text-orange-400',
          bg: 'bg-orange-400/10',
          border: 'border-orange-400/20',
        };

      case 'medium':
        return {
          text: 'text-yellow-400',
          bg: 'bg-yellow-400/10',
          border: 'border-yellow-400/20',
        };

      case 'low':
        return {
          text: 'text-green-400',
          bg: 'bg-green-400/10',
          border: 'border-green-400/20',
        };

      default:
        return {
          text: 'text-gray-400',
          bg: 'bg-gray-400/10',
          border: 'border-gray-400/20',
        };
    }
  };

  return (
    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-blue-400" />

          <h3 className="font-semibold text-gray-200">
            Threat Matrix Overview
          </h3>
        </div>

        <span className="text-xs text-gray-400">
          SOC Real-Time Stream
        </span>
      </div>

      {/* Loading */}
      {loading && (
        <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800 text-center">
          <div className="flex flex-col items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-blue-400 animate-pulse" />

            <p className="text-sm text-gray-400">
              Loading threat intelligence...
            </p>
          </div>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="p-6 bg-red-950/20 rounded-lg border border-red-900/50 text-center">
          <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-2" />

          <p className="text-sm text-red-400">
            {error}
          </p>
        </div>
      )}

      {/* No threats */}
      {!loading && !error && totalThreats === 0 && (
        <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800 text-center">
          <CheckCircle2 className="w-7 h-7 text-green-400 mx-auto mb-2" />

          <p className="text-sm text-gray-300">
            No active threats detected
          </p>

          <p className="text-xs text-gray-500 mt-1">
            AI Threat Engine is monitoring the environment.
          </p>
        </div>
      )}

      {/* Threat data */}
      {!loading && !error && totalThreats > 0 && (
        <div className="space-y-4">
          {/* Summary */}
          <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <ShieldAlert className="w-5 h-5 text-blue-400" />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-200">
                  Threats Detected
                </p>

                <p className="text-xs text-gray-500">
                  Based on current incident data
                </p>
              </div>
            </div>

            <span className="text-2xl font-bold text-gray-100">
              {totalThreats}
            </span>
          </div>

          {/* Severity matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                label: 'Critical',
                value: threatStats.critical,
                key: 'critical',
              },
              {
                label: 'High',
                value: threatStats.high,
                key: 'high',
              },
              {
                label: 'Medium',
                value: threatStats.medium,
                key: 'medium',
              },
              {
                label: 'Low',
                value: threatStats.low,
                key: 'low',
              },
            ].map((item) => {
              const style = getSeverityStyle(item.key);

              return (
                <div
                  key={item.key}
                  className={`p-3 rounded-lg border ${style.bg} ${style.border}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    {item.key === 'critical' && (
                      <AlertOctagon
                        className={`w-4 h-4 ${style.text}`}
                      />
                    )}

                    {item.key === 'high' && (
                      <AlertTriangle
                        className={`w-4 h-4 ${style.text}`}
                      />
                    )}

                    {item.key === 'medium' && (
                      <AlertTriangle
                        className={`w-4 h-4 ${style.text}`}
                      />
                    )}

                    {item.key === 'low' && (
                      <CheckCircle2
                        className={`w-4 h-4 ${style.text}`}
                      />
                    )}

                    <span className={`text-lg font-bold ${style.text}`}>
                      {item.value}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Incident list */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Current Threat Sources
              </p>

              <span className="text-xs text-gray-600">
                {incidents.length} incident
                {incidents.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="space-y-2">
              {incidents.slice(0, 4).map((incident) => {
                const style = getSeverityStyle(
                  incident.severity?.toLowerCase()
                );

                return (
                  <div
                    key={incident.id}
                    className="flex items-center justify-between gap-3 p-3 bg-gray-900/50 rounded-lg border border-gray-800"
                  >
                    <div className="min-w-0">
                      <p className="text-sm text-gray-200 truncate">
                        {incident.title || 'Untitled Incident'}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        {incident.source || 'Unknown source'}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 px-2 py-1 rounded-md border text-[10px] font-semibold uppercase ${style.text} ${style.bg} ${style.border}`}
                    >
                      {incident.severity || 'Unknown'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreatOverview;