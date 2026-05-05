// api/bookingService.js
import api from "./api";

export const getBookings = async () => {
  const res = await api.get("/bookings");
  return res.data;
};

export const getUserBookings = async () => {
  const res = await api.get("/bookings/my");
  return res.data;
};