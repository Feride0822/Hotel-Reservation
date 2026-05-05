// api/hotelService.js
import api from "./api";

export const getHotels = async (search = "") => {
  const res = await api.get(`/hotels?search=${search}`);
  return res.data;
};

export const createHotel = async (data) => {
  const res = await api.post("/hotels", data);
  return res.data;
};

export const updateHotel = async (id, data) => {
  const res = await api.put(`/hotels/${id}`, data);
  return res.data;
};

export const deleteHotel = async (id) => {
  const res = await api.delete(`/hotels/${id}`);
  return res.data;
};