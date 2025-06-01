import React from 'react';
import SidebarMenu from '../components/sidebar-menu';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const userData = JSON.parse(localStorage.getItem('userData'));
    const isAdmin = userData?.roles?.some(role => role.name === "ADMIN");

    if (!accessToken || !isAdmin) {
      navigate('/sam-sport/login');
    }
  }, [navigate]);
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarMenu />
      <main className="flex-1 overflow-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}