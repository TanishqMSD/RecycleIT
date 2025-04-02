import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const StatsOverview = () => {
  // This would be replaced with actual API data
  const stats = {
    totalUsers: 150,
    activeBlogs: 12,
    activeCampaigns: 5,
    totalRecycled: '2.5 tons'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-green-800">{stats.totalUsers}</div>
          <div className="text-sm text-gray-600">Total Users</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-green-800">{stats.activeBlogs}</div>
          <div className="text-sm text-gray-600">Active Blogs</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-green-800">{stats.activeCampaigns}</div>
          <div className="text-sm text-gray-600">Active Campaigns</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-green-800">{stats.totalRecycled}</div>
          <div className="text-sm text-gray-600">Total E-Waste Recycled</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsOverview;