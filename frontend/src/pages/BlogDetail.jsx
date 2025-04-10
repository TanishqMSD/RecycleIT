import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`);
        setBlog(response.data.blog);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch blog');
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <div className="container mx-auto px-4 py-8">Loading...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;
  if (!blog) return <div className="container mx-auto px-4 py-8">Blog not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <button
          onClick={() => navigate('/blog')}
          className="mb-8 flex items-center text-green-700 hover:text-green-900 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Blogs
        </button>

        {blog.banner && (
          <div className="relative h-96 rounded-xl overflow-hidden mb-8">
            <img 
              src={blog.banner} 
              alt={blog.title} 
              className="w-full h-full object-cover"
              onError={(e) => e.target.style.display = 'none'}
            />
          </div>
        )}

        <article className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{blog.title}</h1>
          
          <div className="flex items-center text-gray-500 mb-8">
            <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
            <span className="mx-4">•</span>
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              {Math.floor(Math.random() * 100) + 1}
            </span>
          </div>

          {blog.description && (
            <p className="text-xl text-gray-600 mb-8 font-medium">{blog.description}</p>
          )}

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">{blog.content}</p>
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t">
              {blog.tags.map((tag, index) => (
                <span key={index} className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;