import React, { useState } from 'react';
import SidebarMenu from '../components/sidebar-menu';

const dummyProducts = [
  {
    id: 'p001',
    name: 'Football',
    description: 'Standard size football',
    stockQuantity: 50,
    priceIn: 10,
    priceOut: 15,
    discount: 5,
    thumbnail: 'https://via.placeholder.com/50',
    categoryId: 'c001',
  },
  {
    id: 'p002',
    name: 'Basketball',
    description: 'Indoor basketball',
    stockQuantity: 30,
    priceIn: 12,
    priceOut: 18,
    discount: 10,
    thumbnail: 'https://via.placeholder.com/50',
    categoryId: 'c002',
  },
];

export default function ProductListPage() {
  const [search, setSearch] = useState("");

  const filteredProducts = dummyProducts.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (id) => {
    alert(`Edit product with ID: ${id}`);
    // You can navigate to edit page or open modal here
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete product ID: ${id}?`);
    if (confirmDelete) {
      alert(`Deleted product with ID: ${id}`);
      // Implement your delete logic here
    }
  };

  return (
    <div className="flex">
      <SidebarMenu />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Product List</h2>

        <input
          type="text"
          placeholder="Search by ID or Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 p-2 border rounded w-full max-w-sm"
        />

        <div className="overflow-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-2 border">No</th>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Stock</th>
                <th className="p-2 border">Price In</th>
                <th className="p-2 border">Price Out</th>
                <th className="p-2 border">Discount</th>
                <th className="p-2 border">Thumbnail</th>
                <th className="p-2 border">Category ID</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={product.id} className="hover:bg-gray-100">
                  <td className="p-2 border text-center">{index + 1}</td>
                  <td className="p-2 border">{product.id}</td>
                  <td className="p-2 border">{product.name}</td>
                  <td className="p-2 border">{product.description}</td>
                  <td className="p-2 border text-center">{product.stockQuantity}</td>
                  <td className="p-2 border text-center">${product.priceIn}</td>
                  <td className="p-2 border text-center">${product.priceOut}</td>
                  <td className="p-2 border text-center">{product.discount}%</td>
                  <td className="p-2 border text-center">
                    <img src={product.thumbnail} alt={product.name} className="w-10 h-10 object-cover mx-auto" />
                  </td>
                  <td className="p-2 border text-center">{product.categoryId}</td>
                  <td className="p-2 border text-center space-x-2">
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="11" className="text-center p-4 text-gray-500">
                    No products found.
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
