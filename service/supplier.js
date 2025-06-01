import { BASE_URL } from "./api";
// select list data

export async function getSuppliers(page = 0, size = 10) {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(`${BASE_URL}/api/v1/suppliers?page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch suppliers');
    }

    const data = await response.json();

    if (data.content) {

      return {
        suppliers: data.content,
        totalPages: data.totalPages,
        totalElements: data.totalElements
      };
    } else if (Array.isArray(data)) {

      return {
        suppliers: data,
        totalPages: 1,
        totalElements: data.length
      };
    } else {
      throw new Error('Unexpected API response format');
    }
    
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    throw error;
  }
}

// update data

export async function getSupplier(uuid) {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BASE_URL}/api/v1/suppliers/${uuid}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch supplier data');
  }
  const data = await response.json();
  return {
    ...data,
    address: data.address || {
      addressLine1: "",
      addressLine2: "",
      road: "",
      linkAddress: ""
    }
  };
}

export async function saveSupplier(supplierData, uuid = null) {
  const token = localStorage.getItem('accessToken');
  const method = uuid ? 'PUT' : 'POST';
  const url = uuid ? `${BASE_URL}/api/v1/suppliers/${uuid}` : `${BASE_URL}/api/v1/suppliers`;

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      name: supplierData.name,
      email: supplierData.email,
      phone: supplierData.phone,
      address: {
        addressLine1: supplierData.address.addressLine1 || "",
        addressLine2: supplierData.address.addressLine2 || "",
        road: supplierData.address.road || "",
        linkAddress: supplierData.address.linkAddress || ""
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Request failed');
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }

  return;
}


// delete data
const getHeaders = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('Authentication token not found');
  }
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

export async function deleteSupplier(uuid) {
  if (!uuid) {
    throw new Error('Supplier ID is required');
  }

  try {
    const response = await fetch(`${BASE_URL}/api/v1/suppliers/${uuid}`, {
      method: 'DELETE',
      headers: getHeaders()
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Failed to delete supplier (Status: ${response.status})`);
    }

    if (response.status === 204) {
      return { success: true };
    }
    return await response.json();
    
  } catch (error) {
    console.error('Delete supplier error:', error);
    throw new Error(error.message || 'Failed to delete supplier. Please try again.');
  }
}