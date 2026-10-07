import React from 'react';
import { Shield } from 'lucide-react';

const AuthLayout = ({ children, title = 'SentinelAI Portal' }) => {
  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111827] border border-gray-800 rounded-2xl p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-blue-600/10 border border-blue-500/20 rounded-xl text-blue-400 mb-3">
            <Shield className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-100 tracking-wide">SentinelAI</h2>
          <p className="text-sm text-gray-400 mt-1">{title}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
