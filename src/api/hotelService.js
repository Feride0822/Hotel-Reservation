import api from "./api";

// GET /hotels
export const getHotels = async (params = {}) => {
  const res = await api.get("/hotels", { params });
  return res.data; // { hotels, total, page, totalPages }
};

// GET /hotels/:id
export const getHotel = async (hotelId) => {
  const res = await api.get(`/hotels/${hotelId}`);
  return res.data;
};

// POST /hotels
export const createHotel = async (data) => {
  const res = await api.post("/hotels", data);
  return res.data;
};

// PUT /hotels/:id
export const updateHotel = async (hotelId, data) => {
  const res = await api.put(`/hotels/${hotelId}`, data);
  return res.data;
};

// DELETE /hotels/:id
export const deleteHotel = async (hotelId) => {
  await api.delete(`/hotels/${hotelId}`);
};