import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';

const CampaignAdmin = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    banner: '',
    status: 'upcoming'
  });

  // Fetch campaigns on component mount
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const adminToken = sessionStorage.getItem('isAdminAuthenticated');
        if (!adminToken) {
          throw new Error('Admin authentication not found');
        }
        const response = await fetch('http://localhost:3000/api/campaigns', {
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const adminToken = sessionStorage.getItem('isAdminAuthenticated');
      if (!adminToken) {
        alert('Please log in as admin first');
        return;
      }
      const response = await fetch('http://localhost:3000/api/campaigns', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          location: formData.location,
          date: formData.startDate,
          endDate: formData.endDate,
          banner: formData.banner,
          status: formData.status
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newCampaign = await response.json();
      setCampaigns(prev => [newCampaign, ...prev]);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        location: '',
        startDate: '',
        endDate: '',
        banner: '',
        status: 'upcoming'
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Campaign Management</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Create New Campaign'}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter campaign title"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter campaign description"
                    className="w-full min-h-[100px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="location" className="block text-sm font-medium mb-2">Location</label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Enter campaign location"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium mb-2">Start Date & Time</label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium mb-2">End Date & Time</label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="banner" className="block text-sm font-medium mb-2">Banner Image URL</label>
                  <Input
                    id="banner"
                    name="banner"
                    value={formData.banner}
                    onChange={handleInputChange}
                    placeholder="Enter banner image URL"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="status" className="block text-sm font-medium mb-2">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit">Save Campaign</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : campaigns.length > 0 ? (
        <ScrollArea className="h-[500px]">
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <Card key={campaign._id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{campaign.title}</h3>
                      <p className="text-gray-600 mt-1">{campaign.description}</p>
                      <div className="mt-2 space-y-1 text-sm text-gray-500">
                        <p>Location: {campaign.location}</p>
                        <p>Start: {formatDate(campaign.date)}</p>
                        <p>End: {formatDate(campaign.endDate)}</p>
                        <p>Status: {campaign.status}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={async () => {
                          try {
                            const adminToken = sessionStorage.getItem('isAdminAuthenticated');
                            if (!adminToken) {
                              throw new Error('Admin authentication not found');
                            }
                            const response = await fetch(`http://localhost:3000/api/campaigns/${campaign._id}`, {
                              method: 'DELETE',
                              headers: {
                                'Authorization': `Bearer ${adminToken}`,
                                'Content-Type': 'application/json'
                              }
                            });
                            if (!response.ok) {
                              throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            setCampaigns(prev => prev.filter(c => c._id !== campaign._id));
                          } catch (error) {
                            console.error('Error deleting campaign:', error);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No campaigns found. Create your first campaign!
        </div>
      )}
    </div>
  );
};

export default CampaignAdmin;