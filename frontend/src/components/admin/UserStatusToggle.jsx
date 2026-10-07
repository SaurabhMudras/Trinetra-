import React from 'react';

const UserStatusToggle = ({ isActive, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
        isActive
          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800 hover:bg-emerald-900/80'
          : 'bg-red-950/60 text-red-400 border border-red-800 hover:bg-red-900/80'
      }`}
    >
      {isActive ? 'Enabled' : 'Disabled'}
    </button>
  );
};

export default UserStatusToggle;
