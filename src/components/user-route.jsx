
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function UserRoute({ children }) {
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

  const isUser = userData?.roles?.some(role => role.name === "USER");

  if (!isAuthenticated()) {

    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!isUser) {

    return <Navigate to="/sam-sport/unauthorized" replace />;
  }

  return children;
}