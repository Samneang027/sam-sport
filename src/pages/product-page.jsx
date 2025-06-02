import { BASE_URL } from "../../service/api";
import React, { useState, useEffect } from 'react';
import { uploadImage, createProduct, updateProduct} from '../../service/product';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ProductPage() {
const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB
const navigate = useNavigate();
const [loading, setLoading] = useState(true);
const { uuid } = useParams();
const [product, setProduct] = useState({
  name: '',
  description: '',
  stockQuantity: '',
  priceIn: '',
  priceOut: '',
  discount: '',
  thumbnail: '',
  categoryId: '',
  supplierId: '',
  brandId: ''
});

const [categoryOptions, setCategoryOptions] = useState([]);
const [supplierOptions, setSupplierOptions] = useState([]);
const [brandOptions, setBrandOptions] = useState([]);

const [showCategoryPopup, setShowCategoryPopup] = useState(false);
const [showSupplierPopup, setShowSupplierPopup] = useState(false);
const [showBrandPopup, setShowBrandPopup] = useState(false);
const [categoryPage, setCategoryPage] = useState(0);
const [categoryTotalPages, setCategoryTotalPages] = useState(0);
const [supplierPage, setSupplierPage] = useState(0);
const [supplierTotalPages, setSupplierTotalPages] = useState(0);
const [brandPage, setBrandPage] = useState(0);
const [brandTotalPages, setBrandTotalPages] = useState(0);

// popup category
const fetchCategories = async (page = 0, size = 10) => {
  const token = localStorage.getItem("accessToken");
  const headers = { Authorization: `Bearer ${token}` };

  try {
    const res = await fetch(`${BASE_URL}/api/v1/categories?page=${page}&size=${size}`, { headers });
    const data = await res.json();

    setCategoryOptions(data.content || []);
    setCategoryPage(data.pageable.pageNumber); 
    setCategoryTotalPages(data.totalPages);    
  } catch (err) {
    console.error("Failed to fetch categories:", err);
  }
};

useEffect(() => {
  if (showCategoryPopup) {
    fetchCategories(0);
  }
}, [showCategoryPopup]);

//popup supplier
const fetchSuppliers = async (page = 0, size = 10) => {
  const token = localStorage.getItem("accessToken");
  const headers = { Authorization: `Bearer ${token}` };

  try {
    const res = await fetch(`${BASE_URL}/api/v1/suppliers?page=${page}&size=${size}`, { headers });
    const data = await res.json();

    setSupplierOptions(data.content || []);
    setSupplierPage(data.pageable.pageNumber);
    setSupplierTotalPages(data.totalPages); 
  } catch (err) {
    console.error("Failed to fetch categories:", err);
  }
};

useEffect(() => {
  if (showSupplierPopup) {
    fetchSuppliers(0);
  }
}, [showSupplierPopup]);

//popup brands
const fetchBrands = async (page = 0, size = 10) => {
  const token = localStorage.getItem("accessToken");
  const headers = { Authorization: `Bearer ${token}` };

  try {
    const res = await fetch(`${BASE_URL}/api/v1/brands?page=${page}&size=${size}`, { headers });
    const data = await res.json();

    setBrandOptions(data.content || []);
    setBrandPage(data.pageable.pageNumber);
    setBrandTotalPages(data.totalPages); 
  } catch (err) {
    console.error("Failed to fetch categories:", err);
  }
};

useEffect(() => {
  if (showBrandPopup) {
    fetchBrands(0);
  }
}, [showBrandPopup]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: ['stockQuantity', 'priceOut', 'discount'].includes(name)
        ? Number(value)
        : value
    }));
  };

useEffect(() => {
  const fetchAllData = async () => {
    const token = localStorage.getItem("accessToken");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const [categoriesRes, suppliersRes, brandsRes] = await Promise.all([
        fetch(`${BASE_URL}/api/v1/categories`, { headers }).then(res => res.json()),
        fetch(`${BASE_URL}/api/v1/suppliers`, { headers }).then(res => res.json()),
        fetch(`${BASE_URL}/api/v1/brands`, { headers }).then(res => res.json())
      ]);

      const fetchedCategories = Array.isArray(categoriesRes.content) ? categoriesRes.content : [];
      const fetchedSuppliers = Array.isArray(suppliersRes.content) ? suppliersRes.content : [];
      const fetchedBrands = Array.isArray(brandsRes.content) ? brandsRes.content : [];

      setCategoryOptions(fetchedCategories);
      setSupplierOptions(fetchedSuppliers);
      setBrandOptions(fetchedBrands);

      if (uuid) {
        const res = await fetch(`${BASE_URL}/api/v1/products/${uuid}`, { headers });
        const data = await res.json();

        setProduct({
          name: data.name,
          description: data.description,
          stockQuantity: data.stockQuantity,
          // priceIn: data.priceIn,
          priceOut: data.priceOut,
          discount: data.discount,
          thumbnail: data.thumbnail,
          categoryId: data.category.uuid,
          supplierId: data.supplier.uuid,
          brandId: data.brand.uuid,
          computerSpec: data.computerSpec || {
            processor: "",
            ram: "",
            storage: "",
            gpu: "",
            os: "",
            screenSize: "",
            battery: ""
          }
        });

      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }finally {
    setLoading(false);
  }
  };

  fetchAllData();
}, [uuid]);


const handleSubmit = async (e) => {
  e.preventDefault();
  let thumbnailUrl = product.thumbnail;
  
  if (product.thumbnail instanceof File) {
    if (product.thumbnail.size > MAX_IMAGE_SIZE) {
      Swal.fire("Error", "Thumbnail image must be smaller than 2MB", "error");
      return;
    }

    try {
      const image = await uploadImage(product.thumbnail);
      thumbnailUrl = image.uri || image.url;
    } catch (uploadError) {
      Swal.fire("Error", "Failed to upload image", "error");
      return;
    }
  }

  try {
    setLoading(true);

    const isUpdate = !!uuid;

    const fullProduct = {
      name: product.name.trim(),
      description: product.description.trim(),
      stockQuantity: Number(product.stockQuantity) || 0,
      priceIn: Number(product.priceIn) || 10,
      priceOut: Number(product.priceOut) || 0,
      discount: Number(product.discount) || 0,
      thumbnail: thumbnailUrl,
      categoryUuid: product.categoryId,
      supplierUuid: product.supplierId,
      brandUuid: product.brandId,
      ...(isUpdate ? {} : {
        computerSpec: {
          processor: product.computerSpec?.processor || "",
          ram: product.computerSpec?.ram || "",
          storage: product.computerSpec?.storage || "",
          gpu: product.computerSpec?.gpu || "",
          os: product.computerSpec?.os || "",
          screenSize: product.computerSpec?.screenSize || "",
          battery: product.computerSpec?.battery || ""
        }
      })
    };

    console.log("Sending product to API:", fullProduct);

    if (isUpdate) {
      await updateProduct(uuid, fullProduct);
      Swal.fire("Success", "Product updated successfully", "success");
      navigate('/admin-dashboard/product-list');
    } else {
      await createProduct(fullProduct);
      Swal.fire("Success", "Product created successfully", "success");
      navigate('/admin-dashboard/product');
    }

    // Reset form
    setProduct({
      name: '',
      description: '',
      stockQuantity: '',
      priceOut: '',
      discount: '',
      thumbnail: '',
      categoryId: '',
      supplierId: '',
      brandId: '',
      computerSpec: {
        processor: "",
        ram: "",
        storage: "",
        gpu: "",
        os: "",
        screenSize: "",
        battery: ""
      }
    });

  } catch (error) {
    Swal.fire("Error", error.message || "Something went wrong", "error");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex">

      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
        {loading ? <p>Loading...</p> : (
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
            <label className="block font-medium mb-1">Thumbnail</label>
            {typeof product.thumbnail === 'string' && product.thumbnail && (
              <img
                src={product.thumbnail}
                alt="Thumbnail Preview"
                className="mb-2 max-h-32 object-contain"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setProduct(prev => ({ ...prev, thumbnail: file }));
              }}
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
              min={0}
              type="number"
              name="stockQuantity"
              value={product.stockQuantity}
              onChange={handleChange}
              placeholder="Stock Quantity"
              className="p-2 border rounded w-full"
            />
          </div>

          {/* <div>
            <label className="block font-medium mb-1">Price In</label>
            <input
              min={0}
              type="number"
              name="priceIn"
              value={product.priceIn}
              onChange={handleChange}
              placeholder="Price In error 500 (Internal Server Error)"
              className="p-2 border rounded w-full"
            />
          </div> */}

          <div>
            <label className="block font-medium mb-1">Price Out</label>
            <input
              min={0}
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
              min={0}
              type="number"
              name="discount"
              value={product.discount}
              onChange={handleChange}
              placeholder="Discount (%)"
              className="p-2 border rounded w-full"
            />
          </div>

            {showCategoryPopup && (
              <div className="fixed top-[10%] left-[50%] translate-x-[-50%] w-[90%] md:w-[50%] bg-white border border-gray-300 p-4 z-50 shadow-lg rounded max-h-[80vh] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">Select Category</h3>

                <div className="space-y-2 mb-4">
                  {categoryOptions.map(c => (
                    <div
                      key={c.uuid}
                      onClick={() => {
                        setProduct(prev => ({ ...prev, categoryId: c.uuid }));
                        setShowCategoryPopup(false);
                      }}
                      className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                    >
                      {c.name}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <button type="button"
                    disabled={categoryPage === 0}
                    onClick={() => fetchCategories(categoryPage - 1)}
                    className="px-4 py-1 border rounded disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <span>
                    Page {categoryPage + 1} of {categoryTotalPages}
                  </span>
                  <button type="button"
                    disabled={categoryPage + 1 >= categoryTotalPages}
                    onClick={() => fetchCategories(categoryPage + 1)}
                    className="px-4 py-1 border rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}


          <div>
            <label className="block font-medium mb-1">Category</label>
            <button
              type="button"
              onClick={() => setShowCategoryPopup(true)}
              className="p-2 border rounded w-full text-left bg-white"
            >
              {Array.isArray(categoryOptions)
                ? categoryOptions.find(c => c.uuid === product.categoryId)?.name || "Select Category"
                : "Select Category"}

            </button>
          </div>

            {showSupplierPopup && (
              <div className="fixed top-[10%] left-[50%] translate-x-[-50%] w-[90%] md:w-[50%] bg-white border border-gray-300 p-4 z-50 shadow-lg rounded max-h-[80vh] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">Select Supplier</h3>

                <div className="space-y-2 mb-4">
                  {supplierOptions.map(s => (
                    <div
                      key={s.uuid}
                      onClick={() => {
                        setProduct(prev => ({ ...prev, supplierId: s.uuid }));
                        setShowSupplierPopup(false);
                      }}
                      className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                    >
                      {s.name}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <button type="button"
                    disabled={supplierPage === 0}
                    onClick={() => fetchSuppliers(supplierPage - 1)}
                    className="px-4 py-1 border rounded disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <span>
                    Page {supplierPage + 1} of {supplierTotalPages}
                  </span>
                  <button type="button"
                    disabled={supplierPage + 1 >= supplierTotalPages}
                    onClick={() => fetchSuppliers(supplierPage + 1)}
                    className="px-4 py-1 border rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          <div>
            <label className="block font-medium mb-1">Supplier</label>
            <button
              type="button"
              onClick={() => setShowSupplierPopup(true)}
              className="p-2 border rounded w-full text-left bg-white"
            >
              {Array.isArray(supplierOptions)
                ? supplierOptions.find(s => s.uuid === product.supplierId)?.name || "Select Supplier"
                : "Select Supplier"}

            </button>
          </div>

            {showBrandPopup && (
              <div className="fixed top-[10%] left-[50%] translate-x-[-50%] w-[90%] md:w-[50%] bg-white border border-gray-300 p-4 z-50 shadow-lg rounded max-h-[80vh] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">Select Brand</h3>

                <div className="space-y-2 mb-4">
                  {brandOptions.map(b => (
                    <div
                      key={b.uuid}
                      onClick={() => {
                        setProduct(prev => ({ ...prev, brandId: b.uuid }));
                        setShowBrandPopup(false);
                      }}
                      className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                    >
                      {b.name}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <button type="button"
                    disabled={brandPage === 0}
                    onClick={() => fetchBrands(brandPage - 1)}
                    className="px-4 py-1 border rounded disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <span>
                    Page {brandPage + 1} of {brandTotalPages}
                  </span>
                  <button type="button"
                    disabled={brandPage + 1 >= brandTotalPages}
                    onClick={() => fetchBrands(brandPage + 1)}
                    className="px-4 py-1 border rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          <div>
            <label className="block font-medium mb-1">Brand</label>
            <button
              type="button"
              onClick={() => setShowBrandPopup(true)}
              className="p-2 border rounded w-full text-left bg-white"
            >
              {Array.isArray(brandOptions)
                ? brandOptions.find(b => b.uuid === product.brandId)?.name || "Select Brand"
                : "Select Brand"}
            </button>
          </div>

          <div className="md:col-span-2 text-right">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90"
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}
