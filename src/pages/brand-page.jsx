import React, { useState } from 'react';
import SidebarMenu from '../components/sidebar-menu';

export default function BrandPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    brandLogo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Use FormData if uploading file
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('brandLogo', formData.brandLogo);

    // Example: send to backend
    // fetch('/api/brands', {
    //   method: 'POST',
    //   body: data,
    // });

    console.log('Submitting:', formData);
    alert('Brand submitted!');
  };

  return (
    <div className="flex">
      <SidebarMenu />

      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Add New Brand</h2>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block font-medium mb-1">Brand Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border px-4 py-2 w-full rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border px-4 py-2 w-full rounded"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Brand Logo</label>
            <input
              type="file"
              name="brandLogo"
              accept="image/*"
              onChange={handleChange}
              className="border px-2 py-1 w-full rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
