import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IncidentTable from '../../components/incidents/IncidentTable';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import { getIncidents } from '../../api/incidentApi';

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getIncidents();
        setIncidents(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.response?.data?.detail || 'Unable to load incidents.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Security Incidents</h1>
          <p className="text-sm text-gray-400">Track and manage identified threat incidents</p>
        </div>
        <Link to="/incidents/create">
          <Button>Report Incident</Button>
        </Link>
      </div>

      {error && <ErrorMessage message={error} />}
      {loading ? <Loader message="Loading incidents..." /> : <IncidentTable incidents={incidents} />}
    </div>
  );
};

export default Incidents;
