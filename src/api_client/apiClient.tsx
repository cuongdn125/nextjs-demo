import axios from "axios";

const axiosClient = axios.create({
  // baseURL: "https://fakestoreapi.com/products",
  baseURL: "http://localhost:6789/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
