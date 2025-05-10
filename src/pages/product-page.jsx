import React, { useState } from 'react';
import SidebarMenu from '../components/sidebar-menu';

export default function ProductPage() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    stockQuantity: 0,
    priceIn: 0,
    priceOut: 0,
    discount: 0,
    thumbnail: '',
    categoryId: '',
    supplierId: '',
    brandId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: ['stockQuantity', 'priceIn', 'priceOut', 'discount'].includes(name)
        ? Number(value)
        : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product submitted:', product);
    // Send this to your backend API here
  };

  return (
    <div className="flex">
      <SidebarMenu />

      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          <div>
            <label className="block font-medium mb-1">Product Name</label>
            <input
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="p-2 border rounded w-full"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Thumbnail URL</label>
            <input
              name="thumbnail"
              value={product.thumbnail}
              onChange={handleChange}
              placeholder="Thumbnail URL"
              className="p-2 border rounded w-full"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Description"
              className="p-2 border rounded w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Stock Quantity</label>
            <input
              type="number"
              name="stockQuantity"
              value={product.stockQuantity}
              onChange={handleChange}
              placeholder="Stock Quantity"
              className="p-2 border rounded w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Price In</label>
            <input
              type="number"
              name="priceIn"
              value={product.priceIn}
              onChange={handleChange}
              placeholder="Price In"
              className="p-2 border rounded w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Price Out</label>
            <input
              type="number"
              name="priceOut"
              value={product.priceOut}
              onChange={handleChange}
              placeholder="Price Out"
              className="p-2 border rounded w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Discount (%)</label>
            <input
              type="number"
              name="discount"
              value={product.discount}
              onChange={handleChange}
              placeholder="Discount (%)"
              className="p-2 border rounded w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Category ID</label>
            <input
              name="categoryId"
              value={product.categoryId}
              onChange={handleChange}
              placeholder="Category ID"
              className="p-2 border rounded w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Supplier ID</label>
            <input
              name="supplierId"
              value={product.supplierId}
              onChange={handleChange}
              placeholder="Supplier ID"
              className="p-2 border rounded w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Brand ID</label>
            <input
              name="brandId"
              value={product.brandId}
              onChange={handleChange}
              placeholder="Brand ID"
              className="p-2 border rounded w-full"
            />
          </div>

          <div className="md:col-span-2 text-right">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
