import React, { useState } from 'react';
import Button from '../common/Button';

const IncidentForm = ({ onSubmit, loading = false }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    severity: 'medium',
    source: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
          Incident Title
        </label>
        <input
          type="text"
          name="title"
          required
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Unauthorized Access Attempt"
          disabled={loading}
          className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500 disabled:opacity-50"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
          Description
        </label>
        <textarea
          name="description"
          required
          rows={4}
          value={form.description}
          onChange={handleChange}
          placeholder="Describe the incident..."
          disabled={loading}
          className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500 disabled:opacity-50"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
            Severity
          </label>
          <select
            name="severity"
            value={form.severity}
            onChange={handleChange}
            disabled={loading}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500 disabled:opacity-50"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
            Source
          </label>
          <input
            type="text"
            name="source"
            required
            value={form.source}
            onChange={handleChange}
            placeholder="e.g. firewall, ids, siem"
            disabled={loading}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500 disabled:opacity-50"
          />
        </div>
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Incident'}
      </Button>
    </form>
  );
};

export default IncidentForm;
