import React, { useState } from 'react';
import SidebarMenu from '../components/sidebar-menu';

export default function SupplierListPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const suppliers = [
    { id: 'SUP001', name: 'ABC Co.', telephone: '012345678', email: 'abc@example.com', address: 'Phnom Penh' },
    { id: 'SUP002', name: 'XYZ Ltd.', telephone: '098765432', email: 'xyz@example.com', address: 'Siem Reap' },
    // Add more sample suppliers here
  ];

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id) => {
    alert(`Edit supplier with ID: ${id}`);
    // Implement navigation or modal logic here
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete supplier ID: ${id}?`);
    if (confirmDelete) {
      alert(`Deleted supplier with ID: ${id}`);
      // Implement deletion logic here
    }
  };

  return (
    <div className="flex">
      <SidebarMenu />

      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Supplier List</h2>

        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 mb-4 w-full max-w-md rounded"
        />

        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">No</th>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Telephone</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.map((supplier, index) => (
              <tr key={supplier.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2">{supplier.id}</td>
                <td className="border px-4 py-2">{supplier.name}</td>
                <td className="border px-4 py-2">{supplier.telephone}</td>
                <td className="border px-4 py-2">{supplier.email}</td>
                <td className="border px-4 py-2">{supplier.address}</td>
                <td className="border px-4 py-2 space-x-2 text-center">
                  <button
                    onClick={() => handleEdit(supplier.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(supplier.id)}
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
                  No suppliers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
