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

export async function getBrands(page = 0, size = 10) {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(`${BASE_URL}/api/v1/brands?page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch brands');
    }

    const data = await response.json();
    
    if (data.content) {
      return {
        brands: data.content,
        totalPages: data.totalPages,
        totalElements: data.totalElements
      };
    } else if (Array.isArray(data)) {
      return {
        brands: data,
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

export async function getBrand(uuid) {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BASE_URL}/api/v1/brands/${uuid}`, {
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

export async function saveBrand(brandData, uuid = null) {
  const token = localStorage.getItem('accessToken');
  const method = uuid ? 'PUT' : 'POST';
  const url = uuid ? `${BASE_URL}/api/v1/brands/${uuid}` : `${BASE_URL}/api/v1/brands`;

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      name: brandData.name,
      description: brandData.description,
      brandLogo: brandData.brandLogo
    })
  });

  if (!response.ok) {
    let errorMessage = `Failed to ${uuid ? 'update' : 'create'} brand`;

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
export async function deleteBrand(uuid) {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(`${BASE_URL}/api/v1/brands/${uuid}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete brand');
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting brand:", error);
    throw error;
  }
}