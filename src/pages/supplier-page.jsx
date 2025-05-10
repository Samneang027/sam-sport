import React, { useState } from 'react';
import SidebarMenu from '../components/sidebar-menu';

export default function SupplierPage() {
  const [supplier, setSupplier] = useState({
    name: '',
    email: '',
    telephone: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Supplier data:', supplier);
    // TODO: Send data to API here
  };

  return (
    <div className="flex">
      <SidebarMenu />

      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6">Add New Supplier</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded p-6 max-w-lg"
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={supplier.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={supplier.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Telephone</label>
            <input
              type="tel"
              name="telephone"
              value={supplier.telephone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Address</label>
            <textarea
              name="address"
              value={supplier.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
              rows="3"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90"
          >
            Save Supplier
          </button>
        </form>
      </div>
    </div>
  );
}
