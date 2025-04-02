import { Routes, Route, Outlet } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import ChatbotPopup from './components/ChatbotPopup';

import AuthLayout from './components/AuthLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import { AuthProvider } from './contexts/AuthContext';


const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        <Navbar />
        <AuthLayout/>
        <Outlet />
        <ChatbotPopup />
        <AdminDashboard />
      </div>
    </AuthProvider>
  );
};

export default App;