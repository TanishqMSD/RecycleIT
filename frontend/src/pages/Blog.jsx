import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/blogs`);
        const blogsArray = Array.isArray(response.data.blogs) ? response.data.blogs : [];
        setBlogs(blogsArray);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch blogs');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div className="container mx-auto px-4 py-8">Loading...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-center text-green-800 mb-12">Ewaste Blogs</h1>
        {blogs.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No blogs available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article key={blog._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {blog.banner && (
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={blog.banner} 
                      alt={blog.title} 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-3 hover:text-green-700 transition-colors">{blog.title}</h2>
                  {blog.description && (
                    <p className="text-gray-600 mb-4 line-clamp-2">{blog.description}</p>
                  )}
                  <p className="text-gray-500 mb-4 line-clamp-3">{blog.content}</p>
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4">
                    <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      {Math.floor(Math.random() * 100) + 1}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;