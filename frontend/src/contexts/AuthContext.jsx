import { createContext, useContext, useState, useEffect } from 'react';
import { auth, signInWithGoogle, signOut } from '../firebase/firebase';
import { authenticateUser, getCurrentUser } from '../api/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const userData = await authenticateUser();
          setUser(userData.data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Auth state change error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      setError(null);
      await signInWithGoogle();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const refreshUser = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData.data);
      return userData.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    refreshUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};