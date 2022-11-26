import axiosClient from "./apiClient";

export interface Product {
  id: number;
  name: string;
  description: string;
  total: number;
  price: number;
  import_date: Date;
  post_service: string;
  cloudinarys: Cloudinary[];
}
export interface Cloudinary {
  id: number;
  url: string;
}
export interface Portfolio {
  id: number;
  name: string;
  description: string;
}

export const getListProduct = async (): Promise<Array<Product>> => {
  const response: Array<Product> = await axiosClient.get("/list");
  return response;
};

export const getProduct = async (productId: string): Promise<Product> => {
  const response: Product = await axiosClient.get(`/${productId}`);
  return response;
};

export const getPortfolio = async (): Promise<Array<Portfolio>> => {
  const response: Array<Portfolio> = await axiosClient.get("/portfolio");
  return response;
};

export const getProductByPortfolio = async (
  portfolioId: number
): Promise<Array<Product>> => {
  const response: Array<Product> = await axiosClient.get(
    `/portfolio/${portfolioId}`
  );
  return response;
};
