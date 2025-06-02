
import { BASE_URL } from "./api";
export async function Login(userData) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to insert user');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("InsertUser Error:", error);
    throw error;
  }
}
