import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link, Outlet } from 'react-router-dom';
import { Newspaper, Calendar, Mail } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid gap-8">
        {/* Stats Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-800">1,234</div>
              <div className="text-sm text-gray-600">Total Users</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-800">12</div>
              <div className="text-sm text-gray-600">Active Campaigns</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-800">45</div>
              <div className="text-sm text-gray-600">Blog Posts</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="blog" className="block">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Newspaper className="h-5 w-5 text-green-600" />
                  <h2 className="text-lg font-semibold">Blog Management</h2>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="campaign" className="block">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  <h2 className="text-lg font-semibold">Campaign Management</h2>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="email" className="block">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-green-600" />
                  <h2 className="text-lg font-semibold">Email Communication</h2>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Outlet for nested routes */}
        <div className="mt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;