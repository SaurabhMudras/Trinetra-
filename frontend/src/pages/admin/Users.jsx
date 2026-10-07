import React, { useEffect, useState } from 'react';
import UserTable from '../../components/admin/UserTable';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import useAuth from '../../hooks/useAuth';
import {
  getUsers,
  updateUserRole,
  updateUserStatus,
  deleteUser,
} from '../../api/adminApi';

const Users = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getUsers();
        setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.response?.data?.detail || 'Unable to load users.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleRoleChange = async (userId, role) => {
    try {
      const updated = await updateUserRole(userId, role);
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: updated.role } : u)));
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update role.');
    }
  };

  const handleStatusToggle = async (userId, isActive) => {
    try {
      await updateUserStatus(userId, isActive);
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, is_active: isActive } : u)));
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update status.');
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await deleteUser(userId);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to delete user.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">User Management</h1>
        <p className="text-sm text-gray-400">Control analyst permissions, status, and access roles</p>
      </div>

      {error && <ErrorMessage message={error} />}
      {loading ? (
        <Loader message="Loading users..." />
      ) : (
        <UserTable
          users={users}
          onRoleChange={handleRoleChange}
          onStatusToggle={handleStatusToggle}
          onDelete={handleDelete}
          currentUserId={currentUser?.id}
        />
      )}
    </div>
  );
};

export default Users;
