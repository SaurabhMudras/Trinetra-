import React, { useEffect, useState } from 'react';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import { getAdminDashboard } from '../../api/adminApi';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const result = await getAdminDashboard();
        setData(result);
      } catch (err) {
        setError(err.response?.data?.detail || 'Unable to load admin dashboard.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loader message="Loading admin console..." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Administrator Console</h1>
        <p className="text-sm text-gray-400">System settings, logs audit, and access controls</p>
      </div>

      {error && <ErrorMessage message={error} />}

      {data && (
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 shadow-lg space-y-4">
          <p className="text-gray-200">{data.message}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(data.stats || {}).map(([key, value]) => (
              <div key={key} className="p-4 bg-gray-900/50 rounded-lg border border-gray-800">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  {key.replace(/_/g, ' ')}
                </p>
                <p className="text-2xl font-bold text-gray-100 mt-1">{String(value)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
