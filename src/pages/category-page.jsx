import React, { useState } from 'react';
import SidebarMenu from '../components/sidebar-menu';

export default function CategoryPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryLogo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Category:', formData);
    // You can send formData to an API here
    setFormData({ name: '', description: '', categoryLogo: '' });
  };

  return (
    <div className="flex">
      <SidebarMenu />

      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6">Add Category</h2>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter category name"
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full border px-4 py-2 rounded"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Category Logo (URL)</label>
            <input
              type="url"
              name="categoryLogo"
              value={formData.categoryLogo}
              onChange={handleChange}
              placeholder="https://example.com/logo.png"
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>

          {formData.categoryLogo && (
            <div>
              <label className="block mb-1 font-semibold">Preview</label>
              <img
                src={formData.categoryLogo}
                alt="Category Logo Preview"
                className="h-20 w-auto border rounded"
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
