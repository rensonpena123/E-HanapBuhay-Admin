import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login'; 
import Layout from './components/Layout.jsx';
import Dashboard from './pages/dashboard/dashboard.jsx'; 
import UserManagement from './pages/userManagement/userManagement.jsx'; 
import JobManagement from './pages/jobManagement/jobManagement.jsx';
import BusinessManagement from './pages/BusinessManagement/businessManagement.jsx';
import ApplicationMonitoring from './pages/applicationMonitoring/applicationMonitoring.jsx';
import ReportAndAnalytics from './pages/report&Analytics/report&Analytics.jsx';
import Settings from './pages/settings/settings.jsx';
import Profile from './pages/profile/profile.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/jobs" element={<JobManagement />} />
          <Route path="/business" element={<BusinessManagement />} />
          <Route path="/applications" element={<ApplicationMonitoring />} />
          <Route path="/reports" element={<ReportAndAnalytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;