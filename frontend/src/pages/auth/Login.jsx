import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';
import Button from '../../components/common/Button';
import ErrorMessage from '../../components/common/ErrorMessage';
import { loginUser } from '../../api/authApi';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser(email, password);
      if (data && data.access_token) {
        await login(data.access_token);
        navigate('/dashboard');
      } else {
        setError('Authentication failed. Access token missing.');
      }
    } catch (err) {
      let message = 'Invalid email or password.';
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
    <AuthLayout title="SOC Analyst Authentication">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <ErrorMessage message={error} />}
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
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
      <div className="mt-6 text-center text-xs text-gray-400">
        Need an account?{' '}
        <Link to="/register" className="text-blue-400 hover:underline">
          Register here
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Login;
