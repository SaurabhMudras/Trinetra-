import React from 'react';
import useAuth from '../hooks/useAuth';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">User Profile</h1>
        <p className="text-sm text-gray-400">SOC Analyst Account Credentials</p>
      </div>

      <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 shadow-lg space-y-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Username</label>
          <p className="text-gray-200 font-medium mt-1">{user?.username || 'Analyst'}</p>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Email</label>
          <p className="text-gray-200 font-medium mt-1">{user?.email || 'N/A'}</p>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Role</label>
          <p className="text-blue-400 font-mono text-sm capitalize mt-1">{user?.role || 'SOC Role'}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
