import { Navigate } from 'react-router-dom';

const SecureRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default SecureRoute;