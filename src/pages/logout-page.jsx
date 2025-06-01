
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('isAdmin');

      } catch (error) {
        console.error('Error during logout cleanup:', error);
      } finally {
        await Swal.fire({
          title: 'Logged Out',
          text: 'You have been successfully logged out',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
        
        navigate('/login');
      }
    };

    logout();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary mx-auto mb-4"></div>
        <p className="text-lg">Logging out...</p>
      </div>
    </div>
  );
}