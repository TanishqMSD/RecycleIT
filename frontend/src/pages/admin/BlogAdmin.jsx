import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';

const BlogAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    banner: '',
    tags: '',
    status: 'published'
  });

  // Fetch blogs on component mount
  useEffect(() => {
    // This would be replaced with an actual API call
    setLoading(true);
    // Simulating API call with timeout
    setTimeout(() => {
      setBlogs([
        {
          _id: '1',
          title: 'Recycling Basics',
          description: 'Learn the fundamentals of recycling',
          status: 'published',
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          title: 'Plastic Waste Management',
          description: 'How to properly manage plastic waste',
          status: 'draft',
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
    console.log('Submitting blog:', formData);
    // Add tags as array
    const blogData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim())
    };
    
    // Simulate successful submission
    setBlogs(prev => [{
      _id: Date.now().toString(),
      ...blogData,
      createdAt: new Date().toISOString()
    }, ...prev]);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      content: '',
      banner: '',
      tags: '',
      status: 'published'
    });
    setShowForm(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Blog Posts</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Create New Blog'}
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
                    placeholder="Enter blog title"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
                  <Input
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter short description"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="content" className="block text-sm font-medium mb-1">Content</label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Write your blog content here..."
                    className="w-full min-h-[200px] p-2 border rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="banner" className="block text-sm font-medium mb-1">Banner Image URL</label>
                  <Input
                    id="banner"
                    name="banner"
                    value={formData.banner}
                    onChange={handleInputChange}
                    placeholder="Enter image URL"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium mb-1">Tags</label>
                  <Input
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="Enter tags separated by commas"
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
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit">Save Blog</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="text-center py-8">Loading blogs...</div>
      ) : blogs.length > 0 ? (
        <ScrollArea className="h-[500px]">
          <div className="space-y-4">
            {blogs.map((blog) => (
              <div key={blog._id} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{blog.title}</h3>
                    <p className="text-sm text-gray-500">{blog.description}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <span className="text-xs text-gray-400">{formatDate(blog.createdAt)}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${blog.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {blog.status}
                      </span>
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
          No blogs found. Create your first blog post!
        </div>
      )}
    </div>
  );
};

export default BlogAdmin;