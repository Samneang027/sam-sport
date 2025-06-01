import { BASE_URL } from "./api";
// select all to show on home page
export async function getAllProduct() {
  const data = await fetch(`${BASE_URL}/api/v1/products?page=0&size=1000`)
    .then((response) => response.json());
    return data;
}

// add to cart
export async function addToCartAPI({ userUuid, productUuid, quantity }) {
  const token = localStorage.getItem("accessToken");
  const payload = { userUuid, productUuid, quantity };

  console.log("Sending payload:", payload);

  const response = await fetch(`${BASE_URL}/api/v1/carts/add-to-cart`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  let responseData = null;
  try {
    if (response.headers.get("content-type")?.includes("application/json")) {
      responseData = await response.json();
    }
  } catch (e) {
    console.warn("No JSON body to parse");
  }

  console.log("Response status:", response.status);
  console.log("Response body:", responseData);

  if (!response.ok) {
    throw new Error(responseData?.message || 'Failed to add to cart');
  }

  return responseData;
}


// uploadImage
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

// insert data

export async function createProduct(productData) {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${BASE_URL}/api/v1/products`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create product");
  }

  return await response.json();
}

// update data

export async function updateProduct(uuid, productData) {
  const token = localStorage.getItem("accessToken");

  console.log("PUT to API with data:", productData);

  const response = await fetch(`${BASE_URL}/api/v1/products/${uuid}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("Update error details:", error);
    throw new Error(error.message || "Failed to update product");
  }

  return await response.json();
}

// select data show on table

export async function getProducts(page = 0, size = 1000) {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(`${BASE_URL}/api/v1/products?page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch products');
    }

    const data = await response.json();
    
    if (data.content) {
      return {
        products: data.content,
        totalPages: data.totalPages,
        totalElements: data.totalElements
      };
    } else if (Array.isArray(data)) {
      return {
        products: data,
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

// delete data
export async function deleteProduct(uuid) {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(`${BASE_URL}/api/v1/products/${uuid}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete product');
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

// place order

export async function placeOrder({ token, userUuid, cartUuid, totalAmount, cartItems }) {
  const orderItems = cartItems.map(item => ({
    productName: item.name,
    quantity: item.quantity,
    priceAtPurchase: item.priceOut
  }));

  const orderData = {
    totalAmount: totalAmount,
    orderItems: orderItems,
    status: "PENDING"
  };

  const response = await fetch(`${BASE_URL}/api/v1/orders/place-order/${userUuid}/${cartUuid}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(orderData)
  });

  if (!response.ok) {
    throw new Error("Failed to place order");
  }
    const responseData = await response.json();
  console.log("Order response:", responseData);
  
  return responseData;
}