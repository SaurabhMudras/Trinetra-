import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import Button from '../../components/common/Button';
import { getIncidentById, updateIncident, deleteIncident } from '../../api/incidentApi';
import { SEVERITY_COLORS, STATUS_COLORS, INCIDENT_STATUSES } from '../../utils/constants';
import { formatDate } from '../../utils/formatters';

const IncidentDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getIncidentById(id);
        setIncident(data);
      } catch (err) {
        setError(err.response?.data?.detail || 'Unable to load incident.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleStatusChange = async (e) => {
    try {
      setActionError('');
      const updated = await updateIncident(id, { status: e.target.value });
      setIncident(updated);
    } catch (err) {
      setActionError(err.response?.data?.detail || 'Failed to update status.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this incident?')) return;
    try {
      await deleteIncident(id);
      navigate('/incidents');
    } catch (err) {
      setActionError(err.response?.data?.detail || 'Failed to delete incident.');
    }
  };

  if (loading) return <Loader message="Loading incident..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!incident) return null;

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">{incident.title}</h1>
        <p className="text-sm text-gray-400">Incident forensics and status log</p>
      </div>

      {actionError && <ErrorMessage message={actionError} />}

      <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 shadow-lg space-y-4">
        <p className="text-gray-300">{incident.description}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500">Severity</p>
            <span className={`inline-block mt-1 px-2.5 py-1 text-xs font-semibold rounded-md border ${SEVERITY_COLORS[String(incident.severity || '').toLowerCase()] || 'bg-gray-800 text-gray-300 border-gray-700'}`}>
              {incident.severity}
            </span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500">Status</p>
            <select
              value={incident.status}
              onChange={handleStatusChange}
              className="mt-1 px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-200 focus:outline-none focus:border-blue-500 capitalize"
            >
              {INCIDENT_STATUSES.map((s) => (
                <option key={s} value={s}>{s.replace('_', ' ')}</option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500">Source</p>
            <p className="text-gray-200 mt-1">{incident.source}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500">Created</p>
            <p className="text-gray-200 mt-1">{formatDate(incident.created_at)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500">Updated</p>
            <p className="text-gray-200 mt-1">{formatDate(incident.updated_at)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500">Incident ID</p>
            <p className="text-gray-400 font-mono text-xs mt-1 break-all">{incident.id}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
          <Link to="/incidents">
            <Button variant="secondary">Back</Button>
          </Link>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetailsPage;
