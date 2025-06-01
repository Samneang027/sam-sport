import React, { useState, useEffect } from 'react';
import { getAllUsers } from '/service/user-list';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteUser } from '/service/user-delete';

export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers(currentPage);
        setUsers(data.content);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Failed to fetch users',
          icon: 'error'
        });
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (userId) => {
    console.log('Editing user with ID:', userId);
    navigate(`/admin-dashboard/edit-user/${userId}`);
  };

  const handleDelete = async (userId) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
    allowOutsideClick: false,
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      try {
        await deleteUser(userId);
        return true;
      } catch (error) {
        Swal.showValidationMessage(`Deletion failed: ${error.message}`);
        return false;
      }
    }
  });

  if (result.isConfirmed) {
    try {
      setUsers(prevUsers => prevUsers.filter(user => user.uuid !== userId));
      
      await Swal.fire(
        'Deleted!',
        'User has been successfully deleted.',
        'success'
      );

    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to update local state',
        icon: 'error'
      });
      console.error('State update error:', error);
    }
  }
};

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === i
              ? 'bg-primary text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {i + 1}
        </button>
      );
    }

    return pages;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="p-6 flex-1">
        <h2 className="text-2xl font-bold mb-4">User List</h2>
        <p className="text-gray-600 mb-4">Total Users: {totalElements}</p>

        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 mb-4 w-full max-w-md"
        />

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 text-sm text-left">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-4 py-2 border">No</th>
                <th className="px-4 py-2 border">Username</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Roles</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.uuid} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{index + 1 + (currentPage * 10)}</td>
                  <td className="px-4 py-2 border">
                    <div className="flex items-center">
                      {user.profile && (
                        <img 
                          src={user.profile} 
                          alt={user.username}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                      )}
                      {user.username}
                    </div>
                  </td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">{user.phoneNumber || '-'}</td>
                  <td className="px-4 py-2 border">
                    {user.roles.map(role => role.name).join(', ')}
                  </td>
                  <td className="px-4 py-2 border space-x-2">
                    <button
                      onClick={() => handleEdit(user.uuid)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.uuid)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    {users.length === 0 ? 'No users available' : 'No matching users found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <div>
              <span className="text-sm text-gray-700">
                Showing {(currentPage * 10) + 1} to {Math.min((currentPage + 1) * 10, totalElements)} of {totalElements} users
              </span>
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => handlePageChange(0)}
                disabled={currentPage === 0}
                className="px-3 py-1 rounded border border-gray-300 bg-white text-sm disabled:opacity-50"
              >
                First
              </button>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="px-3 py-1 rounded border border-gray-300 bg-white text-sm disabled:opacity-50"
              >
                Previous
              </button>
              
              {renderPageNumbers()}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className="px-3 py-1 rounded border border-gray-300 bg-white text-sm disabled:opacity-50"
              >
                Next
              </button>
              <button
                onClick={() => handlePageChange(totalPages - 1)}
                disabled={currentPage === totalPages - 1}
                className="px-3 py-1 rounded border border-gray-300 bg-white text-sm disabled:opacity-50"
              >
                Last
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}