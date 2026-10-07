import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import RoleRoute from './RoleRoute';
import DashboardLayout from '../layouts/DashboardLayout';

// Public pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import NotFound from '../pages/NotFound';
import Unauthorized from '../pages/Unauthorized';

// Protected pages
import Dashboard from '../pages/dashboard/Dashboard';
import Incidents from '../pages/incidents/Incidents';
import CreateIncident from '../pages/incidents/CreateIncident';
import IncidentDetails from '../pages/incidents/IncidentDetails';
import Alerts from '../pages/alerts/Alerts';
import AlertDetails from '../pages/alerts/AlertDetails';
import Users from '../pages/admin/Users';
import AdminDashboard from '../pages/admin/AdminDashboard';
import Profile from '../pages/Profile';

const DashboardWrapper = ({ children }) => <DashboardLayout>{children}</DashboardLayout>;

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardWrapper><Dashboard /></DashboardWrapper>} />
        
        {/* Incidents */}
        <Route path="/incidents" element={<DashboardWrapper><Incidents /></DashboardWrapper>} />
        <Route path="/incidents/create" element={<DashboardWrapper><CreateIncident /></DashboardWrapper>} />
        <Route path="/incidents/:id" element={<DashboardWrapper><IncidentDetails /></DashboardWrapper>} />

        {/* Alerts */}
        <Route path="/alerts" element={<DashboardWrapper><Alerts /></DashboardWrapper>} />
        <Route path="/alerts/:id" element={<DashboardWrapper><AlertDetails /></DashboardWrapper>} />

        {/* Profile */}
        <Route path="/profile" element={<DashboardWrapper><Profile /></DashboardWrapper>} />

        {/* Admin Role-Based Routes */}
        <Route element={<RoleRoute allowedRoles={['admin']} />}>
          <Route path="/admin/users" element={<DashboardWrapper><Users /></DashboardWrapper>} />
          <Route path="/admin/dashboard" element={<DashboardWrapper><AdminDashboard /></DashboardWrapper>} />
        </Route>
      </Route>

      {/* 404 Catch-All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
