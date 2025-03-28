import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from './firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from './components/Navbar';
import ChatbotPopup from './components/ChatbotPopup';


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
      <Navbar user={user} />
      <main className="pt-0">
        <Outlet />
      </main>
      <ChatbotPopup />
    </div>
  );
};

export default App;