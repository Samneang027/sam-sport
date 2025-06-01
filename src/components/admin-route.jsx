
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function AdminRoute({ children }) {
  const location = useLocation();
  const accessToken = localStorage.getItem('accessToken');
  const userData = JSON.parse(localStorage.getItem('userData'));

  const isAuthenticated = () => {
    if (!accessToken) return false;
    
    try {
      const decoded = jwtDecode(accessToken);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };

  const isAdmin = userData?.roles?.some(role => role.name === "ADMIN");

  if (!isAuthenticated()) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/sam-sport/unauthorized" replace />;
  }

  return children;
}