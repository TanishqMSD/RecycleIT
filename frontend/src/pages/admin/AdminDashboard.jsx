import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BlogAdmin from './BlogAdmin';
import CampaignAdmin from './CampaignAdmin';
import EmailCommunication from './EmailCommunication';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('blogs');

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid gap-6">
        {/* Stats Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Total Users</h3>
            <p className="text-2xl font-bold">1,234</p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Active Campaigns</h3>
            <p className="text-2xl font-bold">12</p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Blog Posts</h3>
            <p className="text-2xl font-bold">45</p>
          </Card>
        </div>

        {/* Tabbed Sections */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="blogs">Blog Management</TabsTrigger>
            <TabsTrigger value="campaigns">Campaign Management</TabsTrigger>
            <TabsTrigger value="email">Email Communication</TabsTrigger>
          </TabsList>

          <TabsContent value="blogs">
            <BlogAdmin />
          </TabsContent>

          <TabsContent value="campaigns">
            <CampaignAdmin />
          </TabsContent>

          <TabsContent value="email">
            <EmailCommunication />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;