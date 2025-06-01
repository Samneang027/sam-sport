// pages/UnauthorizedPage.jsx
import { Link } from 'react-router-dom';

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">403 - Forbidden</h1>
      <p className="text-xl mb-6">You don't have permission to access this page</p>
      <Link 
        to="/sam-sport" 
        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
      >
        Return to Home
      </Link>
    </div>
  );
}