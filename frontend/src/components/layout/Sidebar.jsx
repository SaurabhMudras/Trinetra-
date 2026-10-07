import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, LayoutDashboard, AlertTriangle, AlertOctagon, Users, User } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const Sidebar = () => {
  const { user } = useAuth();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Incidents', path: '/incidents', icon: AlertOctagon },
    { label: 'Alerts', path: '/alerts', icon: AlertTriangle },
    { label: 'Admin Users', path: '/admin/users', icon: Users, adminOnly: true },
    { label: 'Profile', path: '/profile', icon: User },
  ].filter((item) => !item.adminOnly || user?.role === 'admin');

  return (
    <aside className="hidden md:flex flex-col w-64 bg-[#111827] border-r border-gray-800 min-h-screen p-4">
      <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-gray-800">
        <Shield className="w-8 h-8 text-blue-500" />
        <div>
          <h1 className="font-bold text-lg text-white tracking-wide">SentinelAI</h1>
          <p className="text-xs text-gray-400">SOC Operations</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
