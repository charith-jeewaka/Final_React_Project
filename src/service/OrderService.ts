import api from "./Api";

export const placeOrder = async (orderData: any) => {
  const response = await api.post("/orders", orderData);

  return response.data;
};
