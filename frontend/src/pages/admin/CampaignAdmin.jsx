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
    // This would be replaced with an actual API call
    setLoading(true);
    // Simulating API call with timeout
    setTimeout(() => {
      setCampaigns([
        {
          _id: '1',
          title: 'E-Waste Collection Drive',
          description: 'Community e-waste collection event',
          location: 'City Community Center',
          startDate: '2024-02-15T10:00',
          endDate: '2024-02-15T16:00',
          status: 'upcoming',
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          title: 'Tech Recycling Workshop',
          description: 'Learn about proper electronics disposal',
          location: 'Public Library',
          startDate: '2024-02-20T14:00',
          endDate: '2024-02-20T16:00',
          status: 'upcoming',
          createdAt: new Date(Date.now() - 86400000).toISOString()
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // This would be replaced with an actual API call
    console.log('Submitting campaign:', formData);
    
    // Simulate successful submission
    setCampaigns(prev => [{
      _id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString()
    }, ...prev]);
    
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Campaign Management</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Create New Campaign'}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter campaign title"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter campaign description"
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium mb-1">Location</label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Enter campaign location"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium mb-1">Start Date & Time</label>
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
                    <label htmlFor="endDate" className="block text-sm font-medium mb-1">End Date & Time</label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="datetime-local"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="banner" className="block text-sm font-medium mb-1">Banner Image URL</label>
                  <Input
                    id="banner"
                    name="banner"
                    value={formData.banner}
                    onChange={handleInputChange}
                    placeholder="Enter banner image URL"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="status" className="block text-sm font-medium mb-1">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit">Save Campaign</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="text-center py-8">Loading campaigns...</div>
      ) : campaigns.length > 0 ? (
        <ScrollArea className="h-[500px]">
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign._id} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{campaign.title}</h3>
                    <p className="text-sm text-gray-500">{campaign.description}</p>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">Location:</span> {campaign.location}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Date:</span> {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-400">{formatDate(campaign.createdAt)}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          campaign.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                          campaign.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                          campaign.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="destructive" size="sm">Delete</Button>
                  </div>
                </div>
              </div>
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