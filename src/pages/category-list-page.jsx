import React, { useState } from 'react';
import SidebarMenu from '../components/sidebar-menu';

const sampleCategories = [
  {
    id: 'cat001',
    name: 'Sneakers',
    description: 'Comfortable shoes for daily wear',
    categoryLogo: 'https://via.placeholder.com/60',
  },
  {
    id: 'cat002',
    name: 'Sportswear',
    description: 'Clothing designed for sports activities',
    categoryLogo: 'https://via.placeholder.com/60',
  },
  {
    id: 'cat003',
    name: 'Accessories',
    description: 'Sports caps, bags, and more',
    categoryLogo: 'https://via.placeholder.com/60',
  },
];

export default function CategoryListPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = sampleCategories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id) => {
    alert(`Edit category with ID: ${id}`);
    // You can add modal or redirect logic here
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete category ID: ${id}?`);
    if (confirmDelete) {
      alert(`Deleted category with ID: ${id}`);
      // Implement actual delete logic here
    }
  };

  return (
    <div className="flex">
      <SidebarMenu />

      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Category List</h2>

        <input
          type="text"
          placeholder="Search category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 px-4 py-2 border rounded w-full md:w-1/2"
        />

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">No</th>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Category Logo</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category, index) => (
                <tr key={category.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{category.id}</td>
                  <td className="px-4 py-2 border">{category.name}</td>
                  <td className="px-4 py-2 border">{category.description}</td>
                  <td className="px-4 py-2 border">
                    <img
                      src={category.categoryLogo}
                      alt={category.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border space-x-2 text-center">
                    <button
                      onClick={() => handleEdit(category.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredCategories.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-4">
                    No categories found.
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
