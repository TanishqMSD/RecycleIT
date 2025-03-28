import { useState, useEffect } from 'react';
import { auth, signInWithGoogle, getRedirectResult, signOut } from '../firebase/firebase';

const AuthLayout = () => {
  const [user, setUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          setUser(result.user);
        }
      } catch (error) {
        console.error('Redirect sign-in failed:', error);
      }
    };
    handleRedirectResult();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      if (result) {
        const { user } = result;
        const response = await fetch('http://localhost:5000/api/auth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
          }),
        });

        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.token);
          setUser(user);
        } else {
          throw new Error(data.message);
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isRegistering ? 'register' : 'login';
      const response = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      
      if (response.ok) {
        if (!isRegistering) {
          localStorage.setItem('token', data.token);
        }
        alert(isRegistering ? 'Registration successful!' : 'Login successful!');
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      {user ? (
        <div className="text-center">
          <h2 className="text-lg font-semibold">Welcome, {user.displayName}</h2>
          <img src={user.photoURL} alt="User Avatar" width="50" className="mx-auto rounded-full my-2" />
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">
            {isRegistering ? 'Register' : 'Login'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
            >
              {isRegistering ? 'Register' : 'Login'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-green-600 hover:underline"
            >
              {isRegistering
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </button>
          </div>

          <div className="mt-4">
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Login with Google
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthLayout;