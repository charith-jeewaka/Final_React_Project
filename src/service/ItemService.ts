import api from "./Api";

export const createItem = async (formData: FormData) => {
  const response = await api.post("/items", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getAllItems = async () => {
  const response = await api.get("/items");
  return response.data;
};

export const getItemById = async (id: string) => {
  const response = await api.get(`/items/${id}`);
  return response.data;
};

export const updateItem = async (id: string, formData: FormData) => {
  const response = await api.put(`/items/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteItem = async (id: string) => {
  const response = await api.delete(`/items/${id}`);
  return response.data;
};
