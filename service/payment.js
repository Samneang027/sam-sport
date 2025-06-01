import { BASE_URL } from "./api";

export async function getAllPayments({page = 0, size = 12 }) {
    const token = localStorage.getItem("accessToken");
  const response = await fetch(
    `${BASE_URL}/api/v1/payments?page=${page}&size=${size}`,
    {method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch payments");
  }

  return await response.json();
}