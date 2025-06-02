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
    <div>
      <Menu />
      
      <main className="flex-1 overflow-auto">
        <div className="bg-white rounded-lg shadow">
          <Outlet />
        </div>
      </main>
    </div>
  );
}