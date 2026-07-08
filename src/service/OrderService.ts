import api from "./Api";

export const placeOrder = async (orderData: any) => {
  const response = await api.post("/orders", orderData);

  return response.data;
};

export const getMyOrders = async () => {
  const response = await api.get("/orders/my-orders");
  return response.data;
};

export const getOrderById = async (id: string) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const getAllOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};
