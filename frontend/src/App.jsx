import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatbotPopup from './components/ChatbotPopup';


const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Outlet />
      <ChatbotPopup />
    </div>
  );
};

export default App;