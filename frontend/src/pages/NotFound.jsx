import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-6xl font-extrabold text-gray-700 tracking-widest">404</h1>
      <p className="text-xl font-medium text-gray-300 mt-4">Page Not Found</p>
      <p className="text-sm text-gray-500 mt-2 max-w-sm">
        The SOC resource or endpoint you requested does not exist.
      </p>
      <Link to="/dashboard" className="mt-6">
        <Button>Return to Dashboard</Button>
      </Link>
    </div>
  );
};

export default NotFound;
