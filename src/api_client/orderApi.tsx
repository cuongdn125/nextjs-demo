import axiosClient from "./apiClient";

export const createNewOrder = async (params): Promise<void> => {
    const response: any = await axiosClient.post("/order/new",params);
    return response;
};
  