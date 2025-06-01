import React, { useState,useEffect } from "react";
import Swal from "sweetalert2";
import { getBrand, saveBrand, uploadImage } from "../../service/brand";
import { useParams, useNavigate } from 'react-router-dom';

export default function BrandPage() {
  const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brandLogo: null,
  });
  const { uuid } = useParams();
  useEffect(() => {
  const loadBrand = async () => {
    if (uuid) {
      try {
        const data = await getBrand(uuid);
        setFormData({
          name: data.name,
          description: data.description,
          brandLogo: data.brandLogo,
        });
      } catch (err) {
        Swal.fire("Error", "Failed to load brand", "error");
      }
    }
  };
  loadBrand();
}, [uuid]);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, files } = e.target;
    if (name === "brandLogo") {
      setFormData((prev) => ({
        ...prev,
        brandLogo: files[0],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: e.target.value }));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.brandLogo) {
    Swal.fire("Error", "Brand name and logo are required", "error");
    return;
  }

  try {
    setLoading(true);
    let logoUrl = formData.brandLogo;

    if (formData.brandLogo instanceof File) {
      if (formData.brandLogo.size > MAX_IMAGE_SIZE) {
        Swal.fire("Error", "Image size must be less than 2MB", "error");
        return;
      }

      const image = await uploadImage(formData.brandLogo);
      logoUrl = image.uri || image.url;
    }

    const brandPayload = {
      name: formData.name,
      description: formData.description,
      brandLogo: logoUrl,
    };

    if (uuid) {
      await saveBrand(brandPayload, uuid);
      Swal.fire("Success", "Brand updated", "success");
      navigate("/admin-dashboard/brand-list");
    } else {
      await saveBrand(brandPayload, null);
      Swal.fire("Success", "Brand created successfully", "success");
      setFormData({ name: "", description: "", brandLogo: null });
      navigate("/admin-dashboard/brand");
    }

  } catch (error) {
    Swal.fire("Error", error.message || "Something went wrong", "error");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex">
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Add New Brand</h2>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block font-medium mb-1">Brand Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`border px-4 py-2 w-full rounded ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border px-4 py-2 w-full rounded"
              rows="3"
            />
          </div>

          <div>
              <label className="block font-medium mb-1">Brand Logo *</label>
              <input
                type="file"
                name="brandLogo"
                accept="image/*"
                onChange={handleChange}
                className={`border px-2 py-1 w-full rounded ${
                  errors.brandLogo ? "border-red-500" : "border-gray-300"
                }`}
                // DO NOT try to set value for file input
              />
              {errors.brandLogo && (
                <p className="text-red-500 text-sm mt-1">{errors.brandLogo}</p>
              )}

              {formData.brandLogo && (
                <div className="mt-2">
                  <label className="block text-sm text-gray-600 mb-1">
                    Current Brand Logo:
                  </label>
                  <img
                    src={
                      formData.brandLogo instanceof File
                        ? URL.createObjectURL(formData.brandLogo)
                        : formData.brandLogo
                    }
                    alt="Brand logo preview"
                    className="h-20 object-contain border"
                  />
                </div>
              )}
            </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Brand"}
          </button>
        </form>
      </div>
    </div>
  );
}
