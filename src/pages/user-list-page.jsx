import React, { useState } from 'react';
import SidebarMenu from '../components/sidebar-menu';

export default function UserListPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    { id: '001', username: 'john_doe', phone: '0123456789', email: 'john@example.com', address: 'Phnom Penh' },
    { id: '002', username: 'jane_smith', phone: '0987654321', email: 'jane@example.com', address: 'Siem Reap' },
    { id: '003', username: 'sok_lee', phone: '011223344', email: 'sok@example.com', address: 'Battambang' },
  ];

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id) => {
    alert(`Edit user with ID: ${id}`);
    // Navigate or open modal here
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete user ID: ${id}?`);
    if (confirmDelete) {
      alert(`Deleted user with ID: ${id}`);
      // Implement delete logic
    }
  };

  return (
    <div className="flex">
      <SidebarMenu />

      <div className="p-6 flex-1">
        <h2 className="text-2xl font-bold mb-4">User List</h2>

        <input
          type="text"
          placeholder="Search by username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 mb-4 w-full max-w-md"
        />

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 text-sm text-left">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-4 py-2 border">No</th>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Username</th>
                <th className="px-4 py-2 border">Telephone</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Address</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{user.id}</td>
                  <td className="px-4 py-2 border">{user.username}</td>
                  <td className="px-4 py-2 border">{user.phone}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">{user.address}</td>
                  <td className="px-4 py-2 border space-x-2">
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center p-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
