import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldOff } from 'lucide-react';
import Button from '../components/common/Button';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col items-center justify-center p-4 text-center">
      <ShieldOff className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-3xl font-bold text-gray-100">403 Access Forbidden</h1>
      <p className="text-sm text-gray-400 mt-2 max-w-md">
        You do not have sufficient permissions or role privileges to view this section of SentinelAI.
      </p>
      <Link to="/dashboard" className="mt-6">
        <Button variant="secondary">Back to Dashboard</Button>
      </Link>
    </div>
  );
};

export default Unauthorized;
