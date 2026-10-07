import React from 'react';
import { Bell, User, LogOut, Menu } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const Navbar = ({ onOpenMobileSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-[#111827] border-b border-gray-800 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="md:hidden text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-800"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-sm font-semibold text-gray-300">Cyber Threat Monitoring & Response</h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-800">
          <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-semibold text-sm">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-gray-200">{user?.username || 'Analyst'}</p>
            <p className="text-xs text-gray-400 capitalize">{user?.role || 'SOC Role'}</p>
          </div>
          <button
            onClick={logout}
            className="text-gray-400 hover:text-red-400 p-2 rounded-lg hover:bg-gray-800 transition-colors ml-2"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
