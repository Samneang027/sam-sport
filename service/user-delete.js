import { BASE_URL } from "./api";
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

export async function deleteUser(uuid) {
  if (!uuid) {
    throw new Error('User ID is required');
  }

  try {
    const response = await fetch(`${BASE_URL}/api/v1/users/${uuid}`, {
      method: 'DELETE',
      headers: getHeaders()
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to delete user (Status: ${response.status})`);
    }

    return response.status === 204 ? { success: true } : await response.json();
  } catch (error) {
    console.error('Delete user error:', error);
    throw new Error(error.message || 'Failed to delete user. Please try again.');
  }
}