import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatbotPopup from './components/ChatbotPopup';
import Companies from './pages/recyclers/Companies'; // Import Companies component
import { useState, useEffect } from 'react';
import { auth } from './firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar will be displayed on every page */}
      <Navbar user={user} />

      <main className="pt-0">
        {/* Define the routes */}
        <Routes>
          {/* Wrap the route components in ErrorBoundary */}
          <Route 
            path="/recycler-locator" 
            element={
              <ErrorBoundary>
                <Companies />
              </ErrorBoundary>
            }
          />
          {/* You can define more routes as needed */}
        </Routes>
        <Outlet />
      </main>

      {/* Chatbot popup is included on every page */}
      <ChatbotPopup />
    </div>
  );
};

export default App;
