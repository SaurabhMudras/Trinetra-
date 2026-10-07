import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ErrorMessage = ({ message = 'An error occurred while fetching data.' }) => {
  return (
    <div className="flex items-center gap-3 p-4 rounded-lg bg-red-950/40 border border-red-800/60 text-red-300">
      <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-400" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export default ErrorMessage;
