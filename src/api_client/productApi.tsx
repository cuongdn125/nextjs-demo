import axiosClient from "./apiClient";

export interface Product {
  category: string;
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: {
    count: number;
    rate: number;
  };
}

export const getListProduct = async (): Promise<Array<Product>> => {
  const response: Array<Product> = await axiosClient.get("/");
  return response;
};

export const getProduct = async (productId: string): Promise<Product> => {
  const response: Product = await axiosClient.get(`/${productId}`);
  return response;
};
