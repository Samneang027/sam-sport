import { BASE_URL } from "./api";
export async function getAllUsers(page = 0, size = 10) {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(
    `${BASE_URL}/api/v1/users?page=${page}&size=${size}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
}