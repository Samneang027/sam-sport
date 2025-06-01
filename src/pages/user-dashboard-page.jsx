import React from 'react';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from '../components/menu';

export default function UserDashboard() {
    const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const userData = JSON.parse(localStorage.getItem('userData'));
    const isUser = userData?.roles?.some(role => role.name === "USER");

    if (!accessToken || !isUser) {
      navigate('/sam-sport/login-cart');
    }
  }, [navigate]);
  return (
    <div className="flex h-screen bg-gray-100">
      <Menu />
      
      <main className="flex-1 overflow-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}