import React, { useEffect, useState } from 'react';
import StatCard from '../../components/dashboard/StatCard';
import ThreatOverview from '../../components/dashboard/ThreatOverview';
import RecentAlerts from '../../components/dashboard/RecentAlerts';
import RecentIncidents from '../../components/dashboard/RecentIncidents';

import { ShieldAlert, AlertOctagon, Activity, Server } from 'lucide-react';

import {
  getDashboardStats,
  getIncidents,
  getAlerts,
} from '../../api/dashboardApi';

const Dashboard = () => {
  const [dashboardStats, setDashboardStats] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError('');

        const [incidentsData, alertsData] = await Promise.all([
          getIncidents(),
          getAlerts(),
        ]);

        // Admin dashboard stats are only available to admin users.
        let statsData = null;
        try {
          statsData = await getDashboardStats();
        } catch (statsErr) {
          console.warn('Admin stats unavailable for this user:', statsErr);
        }

        setDashboardStats(statsData);
        setIncidents(Array.isArray(incidentsData) ? incidentsData : []);
        setAlerts(Array.isArray(alertsData) ? alertsData : []);
      } catch (err) {
        console.error('Failed to load dashboard:', err);

        if (err.response?.data?.detail) {
          setError(
            typeof err.response.data.detail === 'string'
              ? err.response.data.detail
              : 'Failed to load dashboard data.'
          );
        } else {
          setError('Unable to connect to the SentinelAI backend.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  /*
   * Calculate dashboard values from real incident data.
   *
   * An incident is considered open when its status
   * is not resolved/closed.
   */
  const openIncidents = incidents.filter((incident) => {
    const status = String(incident.status || '').toLowerCase();

    return status !== 'resolved' && status !== 'closed';
  });

  /*
   * High and critical severity incidents are treated
   * as active threats.
   */
  const activeThreats = openIncidents.filter((incident) => {
    const severity = String(incident.severity || '').toLowerCase();

    return severity === 'high' || severity === 'critical';
  });

  const activeThreatCount = activeThreats.length;
  const openIncidentCount = openIncidents.length;
  const alertCount = alerts.length;

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-100">
          Security Operations Center
        </h1>

        <p className="text-sm text-gray-400">
          Real-time AI cyber threat detection & monitoring overview
        </p>
      </div>

      {/* Backend Error */}
      {error && (
        <div className="rounded-lg border border-red-800 bg-red-950/40 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard
          title="Active Threats"
          value={loading ? '...' : String(activeThreatCount)}
          icon={ShieldAlert}
          trend={activeThreatCount > 0 ? 'up' : 'down'}
          change={
            loading
              ? 'Loading...'
              : activeThreatCount > 0
                ? 'Threats require attention'
                : 'Normal Status'
          }
        />

        <StatCard
          title="Open Incidents"
          value={loading ? '...' : String(openIncidentCount)}
          icon={AlertOctagon}
          trend={openIncidentCount > 0 ? 'up' : 'neutral'}
          change={
            loading
              ? 'Loading...'
              : openIncidentCount > 0
                ? `${openIncidentCount} incident(s) pending`
                : 'No Pending Action'
          }
        />

        <StatCard
          title="System Alerts"
          value={loading ? '...' : String(alertCount)}
          icon={Activity}
          trend={alertCount > 0 ? 'up' : 'neutral'}
          change={
            loading
              ? 'Loading...'
              : alertCount > 0
                ? `${alertCount} alert(s) detected`
                : 'No Active Alerts'
          }
        />

        <StatCard
          title="Total Users"
          value={
            loading
              ? '...'
              : String(dashboardStats?.stats?.total_users ?? 0)
          }
          icon={Server}
          trend="neutral"
          change={
            loading
              ? 'Loading...'
              : `${dashboardStats?.stats?.active_users ?? 0} active users`
          }
        />

      </div>

      {/* Threat + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2">
          <ThreatOverview />
        </div>

        <div>
          <RecentAlerts />
        </div>

      </div>

      {/* Incidents */}
      <RecentIncidents />

    </div>
  );
};

export default Dashboard;