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
    const fetchBlogs = async () => {
      try {
        const adminToken = sessionStorage.getItem('isAdminAuthenticated');
        if (!adminToken) {
          throw new Error('Admin authentication not found');
        }
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`, {
          headers: {
            'Authorization': `Bearer ${adminToken}`
          }
        });
        const data = await response.json();
        setBlogs(data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
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
        throw new Error('Admin authentication not found');
      }
      const blogData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim())
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify(blogData)
      });

      if (!response.ok) {
        throw new Error('Failed to create blog');
      }

      const newBlog = await response.json();
      setBlogs(prev => [newBlog, ...prev]);
      
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
    } catch (error) {
      console.error('Error creating blog:', error);
    }
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
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Blog Posts</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Create New Blog'}
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
                    placeholder="Enter blog title"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
                  <Input
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter short description"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="content" className="block text-sm font-medium mb-2">Content</label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Write your blog content here..."
                    className="w-full min-h-[200px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                    placeholder="Enter image URL"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium mb-2">Tags</label>
                  <Input
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="Enter tags separated by commas"
                  />
                </div>
                
                <div>
                  <label htmlFor="status" className="block text-sm font-medium mb-2">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
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
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setFormData({
                          title: blog.title,
                          description: blog.description,
                          content: blog.content,
                          banner: blog.banner,
                          tags: blog.tags.join(','),
                          status: blog.status
                        });
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={async () => {
                        try {
                          const adminToken = sessionStorage.getItem('isAdminAuthenticated');
                          if (!adminToken) {
                            throw new Error('Admin authentication not found');
                          }
                          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${blog._id}`, {
                            method: 'DELETE',
                            headers: {
                              'Authorization': `Bearer ${adminToken}`
                            }
                          });
                          
                          if (!response.ok) {
                            throw new Error('Failed to delete blog');
                          }
                          
                          setBlogs(prev => prev.filter(b => b._id !== blog._id));
                        } catch (error) {
                          console.error('Error deleting blog:', error);
                        }
                      }}
                    >
                      Delete
                    </Button>
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