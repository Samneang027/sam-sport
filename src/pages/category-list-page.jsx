import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories, deleteCategory } from '/service/category';
import Swal from 'sweetalert2';

export default function CategoryListPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const { categories, totalPages, totalElements } = await getCategories(currentPage, pageSize);
        setCategories(categories);
        setTotalPages(totalPages);
        setTotalElements(totalElements);
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: error.message || 'Failed to load categories',
          icon: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [currentPage]);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (uuid) => {
    navigate(`/admin-dashboard/category/${uuid}`);
  };

  const handleDelete = async (uuid) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await deleteCategory(uuid);
        setCategories(prev => prev.filter(category => category.uuid !== uuid));
        setTotalElements(prev => prev - 1);
        
        Swal.fire(
          'Deleted!',
          'Category has been deleted.',
          'success'
        );
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: error.message || 'Failed to delete category',
          icon: 'error'
        });
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
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Category List</h2>
        <p className="text-gray-600 mb-4">Total Categories: {totalElements}</p>

        <input
          type="text"
          placeholder="Search by category name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 border px-4 py-2 rounded w-full max-w-sm"
        />

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border">
            <thead className="bg-primary text-white">
              <tr>
                <th className="border px-4 py-2">No</th>
                {/* <th className="border px-4 py-2">ID</th> */}
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Category Logo</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category, index) => (
                <tr key={category.uuid} className="hover:bg-gray-100">
                  <td className="border px-4 py-2 text-center">{index + 1 + (currentPage * pageSize)}</td>
                  {/* <td className="border px-4 py-2">{brand.id}</td> */}
                  <td className="border px-4 py-2">{category.name}</td>
                  <td className="border px-4 py-2">{category.description}</td>
                  <td className="border px-4 py-2">
                    <img
                      src={category.categoryLogo}
                      alt={category.name}
                      className="h-10 w-auto object-contain"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100';
                      }}
                    />
                  </td>
                  <td className="border px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(category.uuid)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category.uuid)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredCategories.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    {categories.length === 0 ? 'No brands available' : 'No matching brands found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <div>
              <span className="text-sm text-gray-700">
                Showing {(currentPage * pageSize) + 1} to {Math.min((currentPage + 1) * pageSize, totalElements)} of {totalElements} brands
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