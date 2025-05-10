// import { BASE_URL } from "./api";
// export async function InsertUser() {
//     const user = await fetch(`${BASE_URL}/api/v1/users/user-signup?emsilVerified=false`)
//     .then((response) => response.json());
//     return user;
// }

import { BASE_URL } from "./api";

// Accept user data as a parameter
export async function InsertUser(userData) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/users/user-signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData), // Send the user data in the request body
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
