import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatbotPopup from './components/ChatbotPopup';
import Blog from './pages/Blog';
import Preloader from './components/Preloader';
import { wakeupServer } from './utils/wakeupServer';


const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    wakeupServer();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {isLoading ? (
        <Preloader onLoadingComplete={() => setIsLoading(false)} />
      ) : (
        <>
          <Navbar />
          <Outlet />
          <ChatbotPopup />
        </>
      )}
    </div>
  );
};

export default App;

