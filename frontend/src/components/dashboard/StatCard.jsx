import React from 'react';

const StatCard = ({ title, value, icon: Icon, change, trend = 'neutral', color = 'blue' }) => {
  return (
    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold text-gray-100 mt-2">{value}</h3>
          {change && (
            <p className={`text-xs mt-2 font-medium ${trend === 'up' ? 'text-red-400' : 'text-emerald-400'}`}>
              {change}
            </p>
          )}
        </div>
        {Icon && (
          <div className="p-3 bg-gray-800/80 rounded-lg text-blue-400 border border-gray-700/50">
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
