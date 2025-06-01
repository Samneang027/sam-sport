import React, { useState, useEffect } from 'react';
import { getSuppliers,deleteSupplier } from '/service/supplier';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function SupplierListPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        setLoading(true);
        const { suppliers, totalPages, totalElements } = await getSuppliers(currentPage, pageSize);
        setSuppliers(suppliers);
        setTotalPages(totalPages);
        setTotalElements(totalElements);
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: error.message || 'Failed to load suppliers',
          icon: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, [currentPage]);

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (uuid) => {
    navigate(`/admin-dashboard/supplier/${uuid}`);
  };

  const handleDelete = async (uuid) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    allowOutsideClick: false,
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      try {
        await deleteSupplier(uuid);
        return true;
      } catch (error) {
        Swal.showValidationMessage(`Deletion failed: ${error.message}`);
        return false;
      }
    }
  });

  if (result.isConfirmed) {
    try {
      setSuppliers(prev => prev.filter(supplier => supplier.uuid !== uuid));
      
      await Swal.fire(
        'Deleted!',
        'Supplier has been deleted successfully.',
        'success'
      );
      
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to update local state',
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
        <h2 className="text-2xl font-bold mb-4">Supplier List</h2>
        <p className="text-gray-600 mb-4">Total Suppliers: {totalElements}</p>

        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 mb-4 w-full max-w-md rounded"
        />

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-primary text-white">
              <tr>
                <th className="border px-4 py-2">No</th>
                {/* <th className="border px-4 py-2">ID</th> */}
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Telephone</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Address</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier, index) => (
                <tr key={supplier.uuid} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 text-center">{index + 1 + (currentPage * pageSize)}</td>
                  {/* <td className="border px-4 py-2">{supplier.id}</td> */}
                  <td className="border px-4 py-2">{supplier.name}</td>
                  <td className="border px-4 py-2">{supplier.phone || supplier.telephone}</td>
                  <td className="border px-4 py-2">{supplier.email}</td>
                  <td className="border px-4 py-2">
                    {supplier.address?.addressLine1 || supplier.address}
                  </td>
                  <td className="border px-4 py-2 space-x-2 text-center">
                    <button
                      onClick={() => handleEdit(supplier.uuid)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(supplier.uuid)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredSuppliers.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center p-4 text-gray-500">
                    {suppliers.length === 0 ? 'No suppliers available' : 'No matching suppliers found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <div>
              <span className="text-sm text-gray-700">
                Showing {(currentPage * pageSize) + 1} to {Math.min((currentPage + 1) * pageSize, totalElements)} of {totalElements} suppliers
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