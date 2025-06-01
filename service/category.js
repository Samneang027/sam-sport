import { BASE_URL } from "./api";

export async function uploadImage(file) {
  if (!file) return null;

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${BASE_URL}/api/v1/medias/upload-single`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
    body: formData
  });

  if (response.status === 413) {
    throw new Error("Image file is too large. Please upload one smaller than 2MB.");
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to upload image');
  }

  return await response.json();
}

// select list data

export async function getCategories(page = 0, size = 10) {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(`${BASE_URL}/api/v1/categories?page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch category');
    }

    const data = await response.json();
    
    if (data.content) {
      return {
        categories: data.content,
        totalPages: data.totalPages,
        totalElements: data.totalElements
      };
    } else if (Array.isArray(data)) {
      return {
        categories: data,
        totalPages: 1,
        totalElements: data.length
      };
    } else {
      throw new Error('Unexpected API response format');
    }
    
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
}

// update data

export async function getCategory(uuid) {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BASE_URL}/api/v1/categories/${uuid}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch brand data');
  }
  const data = await response.json();
  return {
    ...data,
  };
}

export async function saveCategory(categoryData, uuid = null) {
  const token = localStorage.getItem('accessToken');
  const method = uuid ? 'PUT' : 'POST';
  const url = uuid ? `${BASE_URL}/api/v1/categories/${uuid}` : `${BASE_URL}/api/v1/categories`;

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      name: categoryData.name,
      description: categoryData.description,
      media: categoryData.categoryLogo
    })
  });

  if (!response.ok) {
    let errorMessage = `Failed to ${uuid ? 'update' : 'create'} category`;

    try {
      const errorData = await response.json();
      if (errorData?.message) {
        errorMessage = errorData.message;
      }
    } catch (_) {
    }

    throw new Error(errorMessage);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

// delete data
export async function deleteCategory(uuid) {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(`${BASE_URL}/api/v1/categories/${uuid}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete category');
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
}