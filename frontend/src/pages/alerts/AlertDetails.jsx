import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import Button from '../../components/common/Button';
import { getAlertById, updateAlert, deleteAlert } from '../../api/alertApi';
import { SEVERITY_COLORS, STATUS_COLORS, ALERT_STATUSES } from '../../utils/constants';
import { formatDate } from '../../utils/formatters';

const AlertDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getAlertById(id);
        setAlert(data);
      } catch (err) {
        setError(err.response?.data?.detail || 'Unable to load alert.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleStatusChange = async (e) => {
    try {
      setActionError('');
      const updated = await updateAlert(id, { status: e.target.value });
      setAlert(updated);
    } catch (err) {
      setActionError(err.response?.data?.detail || 'Failed to update status.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this alert?')) return;
    try {
      await deleteAlert(id);
      navigate('/alerts');
    } catch (err) {
      setActionError(err.response?.data?.detail || 'Failed to delete alert.');
    }
  };

  if (loading) return <Loader message="Loading alert..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!alert) return null;

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">{alert.title}</h1>
        <p className="text-sm text-gray-400">Alert breakdown and threat telemetry</p>
      </div>

      {actionError && <ErrorMessage message={actionError} />}

      <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 shadow-lg space-y-4">
        <p className="text-gray-300">{alert.description}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500">Severity</p>
            <span className={`inline-block mt-1 px-2.5 py-1 text-xs font-semibold rounded-md border ${SEVERITY_COLORS[String(alert.severity || '').toLowerCase()] || 'bg-gray-800 text-gray-300 border-gray-700'}`}>
              {alert.severity}
            </span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500">Status</p>
            <select
              value={alert.status}
              onChange={handleStatusChange}
              className="mt-1 px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-200 focus:outline-none focus:border-blue-500 capitalize"
            >
              {ALERT_STATUSES.map((s) => (
                <option key={s} value={s}>{s.replace('_', ' ')}</option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500">Source</p>
            <p className="text-gray-200 mt-1">{alert.source}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500">Created</p>
            <p className="text-gray-200 mt-1">{formatDate(alert.created_at)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500">Alert ID</p>
            <p className="text-gray-400 font-mono text-xs mt-1 break-all">{alert.id}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
          <Link to="/alerts">
            <Button variant="secondary">Back</Button>
          </Link>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default AlertDetailsPage;
