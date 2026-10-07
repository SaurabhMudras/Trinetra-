import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import Button from '../../components/common/Button';
import ErrorMessage from '../../components/common/ErrorMessage';
import { registerUser } from '../../api/authApi';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const derivedUsername = username.trim() || email.split('@')[0];
    if (derivedUsername.length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);
    try {
      await registerUser({
        username: derivedUsername,
        email,
        password,
      });
      navigate('/login');
    } catch (err) {
      let message = 'Registration failed. Please try again.';
      if (err.response?.data?.detail) {
        const detail = err.response.data.detail;
        if (Array.isArray(detail)) {
          message = detail.map((d) => d.msg || d).join(', ');
        } else if (typeof detail === 'string') {
          message = detail;
        }
      } else if (err.message) {
        message = err.message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Register SOC Analyst Account">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <ErrorMessage message={error} />}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="analyst_user"
            disabled={loading}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500 text-sm disabled:opacity-50"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="analyst@sentinel.ai"
            disabled={loading}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500 text-sm disabled:opacity-50"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            disabled={loading}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500 text-sm disabled:opacity-50"
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>
      <div className="mt-6 text-center text-xs text-gray-400">
        Already registered?{' '}
        <Link to="/login" className="text-blue-400 hover:underline">
          Sign In
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Register;
