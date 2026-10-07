import React from 'react';
import RoleSelector from './RoleSelector';
import UserStatusToggle from './UserStatusToggle';

const UserTable = ({ users = [], onRoleChange, onStatusToggle, onDelete, currentUserId }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-800 bg-[#111827]">
      <table className="w-full text-left text-sm text-gray-300">
        <thead className="bg-gray-900/80 text-xs uppercase tracking-wider text-gray-400 border-b border-gray-800">
          <tr>
            <th className="px-6 py-4">Username</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Role</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4 text-gray-200 font-medium">{user.username}</td>
                <td className="px-6 py-4 text-gray-300">{user.email}</td>
                <td className="px-6 py-4">
                  <RoleSelector
                    currentRole={user.role}
                    onChange={(role) => onRoleChange(user.id, role)}
                  />
                </td>
                <td className="px-6 py-4">
                  <UserStatusToggle
                    isActive={user.is_active !== false}
                    onToggle={() => onStatusToggle(user.id, user.is_active === false)}
                  />
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onDelete(user.id)}
                    disabled={user.id === currentUserId}
                    className="px-3 py-1 text-xs font-semibold rounded-md bg-red-950/60 text-red-400 border border-red-800 hover:bg-red-900/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
