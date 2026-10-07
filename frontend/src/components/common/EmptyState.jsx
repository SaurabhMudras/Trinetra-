import React from 'react';
import { ShieldAlert } from 'lucide-react';

const EmptyState = ({ title = 'No Data Found', description = 'There are currently no records to display.' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-gray-800 rounded-xl bg-[#111827]/40">
      <ShieldAlert className="w-12 h-12 text-gray-500 mb-4" />
      <h4 className="text-base font-medium text-gray-200">{title}</h4>
      <p className="text-sm text-gray-400 mt-1 max-w-sm">{description}</p>
    </div>
  );
};

export default EmptyState;
