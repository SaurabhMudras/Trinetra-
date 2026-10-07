import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IncidentForm from '../../components/incidents/IncidentForm';
import ErrorMessage from '../../components/common/ErrorMessage';
import { createIncident } from '../../api/incidentApi';

const CreateIncident = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError('');
      await createIncident(formData);
      navigate('/incidents');
    } catch (err) {
      const detail = err.response?.data?.detail;
      setError(typeof detail === 'string' ? detail : 'Failed to create incident.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Create Security Incident</h1>
        <p className="text-sm text-gray-400">File a new incident ticket for investigation</p>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 shadow-lg">
        <IncidentForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
};

export default CreateIncident;
