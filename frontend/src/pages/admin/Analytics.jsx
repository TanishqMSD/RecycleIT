import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, LineChart, PieChart, Loader2 } from 'lucide-react';
import { fetchAnalyticsData } from '@/api/analytics';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data = await fetchAnalyticsData();
        setAnalytics(data);
      } catch (err) {
        setError('Failed to load analytics data');
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-8">{error}</div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Website Analytics</h1>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-800">{analytics?.pageViews.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Page Views</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-800">{analytics?.uniqueVisitors.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Unique Visitors</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-800">{analytics?.avgSessionDuration}</div>
            <div className="text-sm text-gray-600">Avg. Session Duration</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <LineChart className="h-5 w-5 text-green-600" />
              <h2 className="text-lg font-semibold">Traffic Overview</h2>
            </div>
            <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg">
              <span className="text-gray-500">Traffic Chart Placeholder</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="h-5 w-5 text-green-600" />
              <h2 className="text-lg font-semibold">User Demographics</h2>
            </div>
            <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg">
              <span className="text-gray-500">Demographics Chart Placeholder</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart className="h-5 w-5 text-green-600" />
              <h2 className="text-lg font-semibold">Popular Pages</h2>
            </div>
            <div className="space-y-4">
              {analytics?.popularPages.map((page, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{page.name}</span>
                  <span className="text-green-600">{page.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;