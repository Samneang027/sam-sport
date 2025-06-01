import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSupplier, saveSupplier } from '/service/supplier';
import Swal from 'sweetalert2';

export default function SupplierPage() {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      addressLine1: "",
      addressLine2: "",
      road: "",
      linkAddress: ""
    }
  });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const isEditMode = !!uuid;

  useEffect(() => {
    if (isEditMode) {
      const fetchSupplier = async () => {
        try {
          const data = await getSupplier(uuid);
          setSupplier(data);
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: error.message || 'Failed to load supplier data',
            icon: 'error'
          });
          navigate('/admin-dashboard/supplier');
        } finally {
          setLoading(false);
        }
      };
      fetchSupplier();
    } else {
      setLoading(false);
    }
  }, [uuid, isEditMode, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setSupplier(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
    } else {
      setSupplier(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!supplier.name.trim()) newErrors.name = 'Name is required';
    if (!supplier.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(supplier.email)) newErrors.email = 'Invalid email format';
    if (!supplier.phone.trim()) newErrors.phone = 'Phone is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      await saveSupplier(supplier, uuid);
      
      await Swal.fire({
        title: 'Success!',
        text: `Supplier ${isEditMode ? 'updated' : 'created'} successfully`,
        icon: 'success'
      });
      
      navigate('/admin-dashboard/supplier-list');
      
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message || `Failed to ${isEditMode ? 'update' : 'create'} supplier`,
        icon: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6">
          {isEditMode ? 'Edit Supplier' : 'Add New Supplier'}
        </h2>
        
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 max-w-lg">
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name *</label>
            <input
              type="text"
              name="name"
              value={supplier.name}
              onChange={handleChange}
              className={`w-full border rounded px-4 py-2 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={supplier.email}
              onChange={handleChange}
              className={`w-full border rounded px-4 py-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Phone *</label>
            <input
              type="tel"
              name="phone"
              value={supplier.phone}
              onChange={handleChange}
              className={`w-full border rounded px-4 py-2 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Address Line 1</label>
            <input
              type="text"
              name="address.addressLine1"
              value={supplier.address.addressLine1}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Address Line 2</label>
            <input
              type="text"
              name="address.addressLine2"
              value={supplier.address.addressLine2}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Road</label>
            <input
              type="text"
              name="address.road"
              value={supplier.address.road}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Google Maps Link</label>
            <input
              type="url"
              name="address.linkAddress"
              value={supplier.address.linkAddress}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="https://maps.app.goo.gl/..."
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate('/admin-dashboard/supplier-list')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50"
            >
              {loading 
                ? isEditMode ? 'Updating...' : 'Saving...' 
                : isEditMode ? 'Update Supplier' : 'Save Supplier'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}