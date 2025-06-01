import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../../service/product';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

export default function ProductListPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async (page = 0) => {
    try {
      setLoading(true);
      const { products, totalPages } = await getProducts(page, 10);
      setProducts(products);
      setTotalPages(totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

const filteredProducts = products
  .filter(product =>
    ['Nike', 'Puma', 'Adidas'].includes(product.brand?.name)
  )
  .filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.id?.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (uuid) => {
    navigate(`/admin-dashboard/product/${uuid}`);
  };

const handleDelete = async (uuid) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await deleteProduct(uuid);
        setProducts(prev => prev.filter(product => product.uuid !== uuid));
        setTotalElements(prev => prev - 1);
        
        Swal.fire(
          'Deleted!',
          'Product has been deleted.',
          'success'
        );
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: error.message || 'Failed to delete product',
          icon: 'error'
        });
      }
    }
  };

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex">
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Product List</h2>

        <input
          type="text"
          placeholder="Search by ID or Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 p-2 border rounded w-full max-w-sm"
        />

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <>
            <div className="overflow-auto">
              <table className="min-w-full border border-gray-300 text-sm">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="p-2 border">No</th>
                    {/* <th className="p-2 border">ID</th> */}
                    <th className="p-2 border">Name</th>
                    {/* <th className="p-2 border">Description</th> */}
                    <th className="p-2 border">Stock</th>
                    <th className="p-2 border">Price In</th>
                    <th className="p-2 border">Price Out</th>
                    <th className="p-2 border">Discount</th>
                    <th className="p-2 border">Thumbnail</th>
                    <th className="p-2 border">Category</th>
                    <th className="p-2 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, index) => (
                    <tr key={product.uuid} className="hover:bg-gray-100">
                      <td className="p-2 border text-center">{index + 1}</td>
                      {/* <td className="p-2 border">{product.id}</td> */}
                      <td className="p-2 border">{product.name}</td>
                      {/* <td className="p-2 border">{product.description}</td> */}
                      <td className="p-2 border text-center">{product.stockQuantity}</td>
                      <td className="p-2 border text-center">${product.priceIn}</td>
                      <td className="p-2 border text-center">${product.priceOut}</td>
                      <td className="p-2 border text-center">{product.discount}%</td>
                      <td className="p-2 border text-center">
                        <img src={product.thumbnail} alt={product.name} className="w-10 h-10 object-cover mx-auto" />
                      </td>
                      <td className="p-2 border text-center">{product.category.name}</td>
                      <td className="p-2 border text-center space-x-2">
                        <button
                          onClick={() => handleEdit(product.uuid)}
                          className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.uuid)}
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

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-center items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i)}
                  className={`px-3 py-1 rounded ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
