import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ message = 'Loading SOC Operations...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-gray-400">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-3" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export default Loader;
