import { BASE_URL } from "./api";
// fech is asynchronous function 
export async function getAllProduct() {
  const data = await fetch(`${BASE_URL}api/v1/products`)
    .then((response) => response.json());
    return data;
}
