import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
 
const API_URL = 'https://dummyjson.com/products';
const LOCAL_STORAGE_KEY = 'products';
 
const initializeLocalStorage = async () => {
  const existing = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!existing) {
    const { data } = await axios.get(API_URL);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.products));
  }
};
 
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      await initializeLocalStorage();
      const products = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      return products;
    },
  });
};
 
export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newProduct) => {
      const products = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
      const id = Date.now(); 
      const updated = [...products, { ...newProduct, id }];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    },
    onSuccess: () => queryClient.invalidateQueries(['products']),
  });
};
 

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedProduct) => {
      const products = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
      const updated = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    },
    onSuccess: () => queryClient.invalidateQueries(['products']),
  });
};
 
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => {
      const products = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
      const updated = products.filter(p => p.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    },
    onSuccess: () => queryClient.invalidateQueries(['products']),
  });
};
 