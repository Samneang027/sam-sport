import React, { useState,useEffect } from "react";
import Swal from "sweetalert2";
import { getCategory, saveCategory, uploadImage } from "../../service/category";
import { useParams, useNavigate } from 'react-router-dom';

export default function CategoryPage() {
  const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryLogo: null,
  });
  const { uuid } = useParams();
  useEffect(() => {
  const loadCategory = async () => {
    if (uuid) {
      try {
        const data = await getCategory(uuid);
        setFormData({
          name: data.name,
          description: data.description,
          categoryLogo: data.media,
        });
      } catch (err) {
        Swal.fire("Error", "Failed to load category", "error");
      }
    }
  };
  loadCategory();
}, [uuid]);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, files } = e.target;
    if (name === "media") {
      setFormData((prev) => ({
        ...prev,
        categoryLogo: files[0],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: e.target.value }));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name) {
    Swal.fire("Error", "Category name required", "error");
    return;
  }

  try {
    setLoading(true);
    let logoUrl = formData.categoryLogo;

    if (formData.categoryLogo instanceof File) {
      if (formData.categoryLogo.size > MAX_IMAGE_SIZE) {
        Swal.fire("Error", "Image size must be less than 2MB", "error");
        return;
      }

      const image = await uploadImage(formData.categoryLogo);
      logoUrl = image.uri || image.url;
    }

    const categoryPayload = {
      name: formData.name,
      description: formData.description,
      categoryLogo: logoUrl,
    };

    if (uuid) {
      await saveCategory(categoryPayload, uuid);
      Swal.fire("Success", "Category updated", "success");
      navigate("/admin-dashboard/category-list");
    } else {
      await saveCategory(categoryPayload, null);
      Swal.fire("Success", "Cateogry created successfully", "success");
      setFormData({ name: "", description: "", categoryLogo: null });
      navigate("/admin-dashboard/category");
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
        <h2 className="text-2xl font-bold mb-4">Add New Cateogry</h2>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block font-medium mb-1">Cateogry Name *</label>
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
              <label className="block font-medium mb-1">Category Logo *</label>
              <input
                type="file"
                name="categoryLogo"
                accept="image/*"
                onChange={handleChange}
                className={`border px-2 py-1 w-full rounded ${
                  errors.categoryLogo ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.categoryLogo && (
                <p className="text-red-500 text-sm mt-1">{errors.categoryLogo}</p>
              )}

              {formData.categoryLogo && (
                <div className="mt-2">
                  <label className="block text-sm text-gray-600 mb-1">
                    Current Category Logo:
                  </label>
                  <img
                    src={
                      formData.categoryLogo instanceof File
                        ? URL.createObjectURL(formData.categoryLogo)
                        : formData.categoryLogo
                    }
                    alt="Category logo preview"
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
            {loading ? "Creating..." : "Create Category"}
          </button>
        </form>
      </div>
    </div>
  );
}
