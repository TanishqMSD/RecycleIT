import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = credentials;

    try {
      // Input validation
      if (!username.trim() || !password.trim()) {
        setError('Please enter both username and password');
        return;
      }

      const envUsername = import.meta.env.VITE_USERNAME;
      const envPassword = import.meta.env.VITE_PASSWORD;

      // Credential validation
      if (!envUsername || !envPassword) {
        setError('Admin credentials not properly configured');
        return;
      }

      if (username === envUsername && password === envPassword) {
        // Generate a secure token with timestamp and random component
        const timestamp = Date.now();
        const randomComponent = Math.random().toString(36).substring(2);
        const adminToken = btoa(`${username}:${timestamp}:${randomComponent}`);
        
        // Store authentication data
        sessionStorage.setItem('adminToken', adminToken);
        sessionStorage.setItem('isAdminAuthenticated', 'true');
        sessionStorage.setItem('adminLoginTime', timestamp.toString());
        
        navigate('/admin-dashboard');
      } else {
        // Generic error message for security
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again.')
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Admin Access
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
          </div>

          {error && (
            <div className="text-center text-sm text-red-600">{error}</div>
          )}

          <div>
            <Button
              type="submit"
              className="group relative flex w-full justify-center bg-green-800 hover:bg-green-700"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;