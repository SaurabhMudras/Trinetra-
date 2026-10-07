import React from 'react';

const UserDetails = ({ user }) => {
  if (!user) return null;

  return (
    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-100">{user.email}</h3>
      <p className="text-sm text-gray-400 mt-1 capitalize">Role: {user.role}</p>
    </div>
  );
};

export default UserDetails;
