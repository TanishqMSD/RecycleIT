import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blogs?page=${page}&limit=6`);
      if (!response.ok) throw new Error('Failed to fetch blogs');
      const data = await response.json();
      // Ensure blogs is always an array
      const blogsArray = Array.isArray(data.blogs) ? data.blogs : [];
      setBlogs(blogsArray);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading blogs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Card key={blog._id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <img 
              src={blog.banner} 
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-4">{blog.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{formatDate(blog.createdAt)}</span>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = `/blog/${blog._id}`}
                >
                  Read More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {blogs.length > 0 && (
        <div className="flex justify-center gap-2 mt-8">
          <Button
            variant="outline"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {blogs.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No blogs available at the moment.
        </div>
      )}
    </div>
  );
};

export default BlogList;