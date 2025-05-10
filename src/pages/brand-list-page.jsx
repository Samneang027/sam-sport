import React, { useState } from 'react';
import SidebarMenu from '../components/sidebar-menu';

export default function BrandListPage() {
  const [brands] = useState([
    {
      id: 'B001',
      name: 'Nike',
      description: 'Sportswear brand',
      brandLogo: 'https://logo.clearbit.com/nike.com',
    },
    {
      id: 'B002',
      name: 'Adidas',
      description: 'Athletic apparel and footwear',
      brandLogo: 'https://logo.clearbit.com/adidas.com',
    },
  ]);

  const [search, setSearch] = useState('');

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (id) => {
    alert(`Edit brand with ID: ${id}`);
    // Add your modal or navigation logic here
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete brand ID: ${id}?`);
    if (confirmDelete) {
      alert(`Deleted brand with ID: ${id}`);
      // Add your delete logic here
    }
  };

  return (
    <div className="flex">
      <SidebarMenu />

      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Brand List</h2>

        <input
          type="text"
          placeholder="Search by brand name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 border px-4 py-2 rounded w-full max-w-sm"
        />

        <table className="w-full table-auto border-collapse border">
          <thead className="bg-primary text-white">
            <tr>
              <th className="border px-4 py-2">No</th>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Brand Logo</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBrands.map((brand, index) => (
              <tr key={brand.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2">{brand.id}</td>
                <td className="border px-4 py-2">{brand.name}</td>
                <td className="border px-4 py-2">{brand.description}</td>
                <td className="border px-4 py-2">
                  <img
                    src={brand.brandLogo}
                    alt={brand.name}
                    className="h-10 w-auto object-contain"
                  />
                </td>
                <td className="border px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(brand.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(brand.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredBrands.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No brands found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
