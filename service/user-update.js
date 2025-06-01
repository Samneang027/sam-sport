import { BASE_URL } from "./api";

export async function getUser(uuid) {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BASE_URL}/api/v1/users/${uuid}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return response.json();
}

export async function updateUser(uuid, userData) {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BASE_URL}/api/v1/users/${uuid}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(userData)
  });
  if (!response.ok) {
    throw new Error('Failed to update user');
  }
  return response.json();
}