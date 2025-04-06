import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/home/Home';
import GameHome from '../pages/game';
import SortingGame from '../pages/game/sorting';
import ScanPage from '../pages/scan/ScanPage';
import AdminDashboard from '../pages/admin/AdminDashboard';
import BlogAdmin from '../pages/admin/BlogAdmin';
import CampaignAdmin from '../pages/admin/CampaignAdmin';
import EmailCommunication from '../pages/admin/EmailCommunication';
import StatsOverview from '../pages/admin/StatsOverview';
import Analytics from '../pages/admin/Analytics';
import SecureRoute from '../pages/secure/SecureRoute';
import AdminLogin from '../pages/admin/AdminLogin';
import Campaigns from '../pages/campaigns/Campaigns';
import Recyclers from '../pages/info/Recyclers';
import Blog from '../pages/Blog';
import BlogDetail from '../pages/BlogDetail';
import RecyclingGuides from '../pages/guides/RecyclingGuides';

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
        path: '/campaigns',
        element: <Campaigns />
      },
      {
        path: '/recyclers',
        element: <Recyclers />
      },
      {
        path: '/blog',
        element: <Blog />
      },
      {
        path: '/blog/:id',
        element: <BlogDetail />
      },
      {
        path: 'admin-dashboard',
        element: <SecureRoute><AdminDashboard /></SecureRoute>
      },
      {
        path: 'admin-dashboard/blog',
        element: <SecureRoute><BlogAdmin /></SecureRoute>
      },
      {
        path: 'admin-dashboard/campaign',
        element: <SecureRoute><CampaignAdmin /></SecureRoute>
      },
      {
        path: 'admin-dashboard/email',
        element: <SecureRoute><EmailCommunication /></SecureRoute>
      },
      {
        path: 'admin-dashboard/stats',
        element: <SecureRoute><StatsOverview /></SecureRoute>
      },
      {
        path: 'admin-dashboard/analytics',
        element: <SecureRoute><Analytics /></SecureRoute>
      },
      {
        path: 'admin-control',
        element: <AdminLogin />
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
      },
      {
        path: '/guides',
        element: <RecyclingGuides />
      }
    ]
  },
]);

export default router;