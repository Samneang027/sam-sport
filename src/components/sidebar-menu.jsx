import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftRight } from '@fortawesome/free-solid-svg-icons';

export default function SidebarMenu() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    "User List",
    "Supplier", "Supplier List",
    "Brand", "Brand List",
    "Category", "Category List",
    "Product", "Product List",
    "Log out"
  ];

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <aside
      className={`bg-primary text-white min-h-screen transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
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
              to=""
              className="block px-4 py-2 rounded hover:bg-white hover:text-primary transition duration-200"
              title={isCollapsed ? item : undefined}
            >
              {isCollapsed ? (
                <span className="block w-full text-center text-sm truncate">{item[0]}</span>
              ) : (
                item
              )}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
