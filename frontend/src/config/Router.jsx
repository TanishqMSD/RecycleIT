import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/home';
import GameHome from '../pages/game';
import SortingGame from '../pages/game/sorting';
import AuthLayout from '../components/AuthLayout';
import ScanPage from '../pages/scan';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'auth',
        element: <AuthLayout />
      },
      {
        path: 'game',
        element: <GameHome />
      },
      {
        path: 'game/sorting',
        element: <SortingGame />
      },
      {
        path: 'scan',
        element: <ScanPage />
      }
    ]
  },
]);

export default router;