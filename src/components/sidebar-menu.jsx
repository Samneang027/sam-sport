import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftRight } from '@fortawesome/free-solid-svg-icons';

export default function SidebarMenu() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "User", path: "/admin-dashboard/edit-user" },
    { name: "User List", path: "/admin-dashboard/user-list" },
    { name: "Supplier", path: "/admin-dashboard/supplier" },
    { name: "Supplier List", path: "/admin-dashboard/supplier-list" },
    { name: "Brand", path: "/admin-dashboard/brand" },
    { name: "Brand List", path: "/admin-dashboard/brand-list" },
    { name: "Category", path: "/admin-dashboard/category" },
    { name: "Category List", path: "/admin-dashboard/category-list" },
    { name: "Product", path: "/admin-dashboard/product" },
    { name: "Product List", path: "/admin-dashboard/product-list" },
    { name: "Payment List", path: "/admin-dashboard/payment-list" },
    { name: "Log out", path: "/logout" }
  ];

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <aside className={`bg-primary text-white min-h-screen transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-4 flex justify-between items-center">
        {!isCollapsed && (
          <h1 className="aclonica font-bold text-lg lg:text-2xl">SAM SPORT</h1>
        )}
        <button onClick={toggleSidebar} className="focus:outline-none">
          <FontAwesomeIcon icon={faLeftRight} className="text-white text-xl" />
        </button>
      </div>

      <ul className="space-y-2 mt-4">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className={`block px-4 py-2 rounded hover:bg-white hover:text-primary transition duration-200 ${
                location.pathname.includes(item.path) ? 'bg-white text-primary' : ''
              }`}
              title={isCollapsed ? item.name : undefined}
            >
              {isCollapsed ? (
                <span className="block w-full text-center text-sm truncate">{item.name[0]}</span>
              ) : (
                item.name
              )}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}