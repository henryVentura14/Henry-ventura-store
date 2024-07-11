import { API_URL } from "@/constants/Products.contanst";

export const fetchProducts = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const fetchProductById = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

export const createProduct = async (product: any) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  return response.json();
};

export const updateProduct = async (id: number, product: any) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  return response.json();
};

export const deleteProduct = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};
