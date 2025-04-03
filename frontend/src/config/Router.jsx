import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/home';
import GameHome from '../pages/game';
import SortingGame from '../pages/game/sorting';
import AuthLayout from '../components/AuthLayout';
import ScanPage from '../pages/scan';
import Companies from '../pages/recyclers/Companies'; // Import the Companies component

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,  // App component as the layout
    children: [
      {
        path: '/',  // Home page
        element: <Home />
      },
      {
        path: 'auth',  // Authentication page
        element: <AuthLayout />
      },
      {
        path: 'game',  // Game home page
        element: <GameHome />
      },
      {
        path: 'game/sorting',  // Sorting game page
        element: <SortingGame />
      },
      {
        path: 'scan',  // Scan page
        element: <ScanPage />
      },
      {
        path: 'recycler-locator',  // Recycler locator page
        element: <Companies />  // Component to render for this path
      }
    ]
  },
]);

export default router;
