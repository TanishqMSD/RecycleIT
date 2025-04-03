import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = credentials;

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    const envUsername = import.meta.env.VITE_USERNAME;
    const envPassword = import.meta.env.VITE_PASSWORD;

    if (username === envUsername && password === envPassword) {
      // Generate a simple token for admin authentication
      const adminToken = btoa(`${username}:${Date.now()}`);
      sessionStorage.setItem('adminToken', adminToken);
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/admin-dashboard');
    } else {
      if (username !== envUsername) {
        setError('Invalid username');
      } else {
        setError('Invalid password');
      }
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