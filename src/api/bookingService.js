import api from "./api";

// GET /bookings/my — logged-in user's own bookings
export const getUserBookings = async (page = 1, limit = 20) => {
  const res = await api.get("/bookings/my", { params: { page, limit } });
  return res.data.bookings; // array
};

// GET /bookings — admin: all bookings
export const getBookings = async (page = 1, limit = 20) => {
  const res = await api.get("/bookings", { params: { page, limit } });
  return res.data; // array
};

// POST /bookings — create a booking
export const createBooking = async (data) => {
  const res = await api.post("/bookings", data);
  return res.data;
};

// PUT /bookings/:id/cancel — cancel a booking
export const cancelBooking = async (bookingId) => {
  const res = await api.put(`/bookings/${bookingId}/cancel`);
  return res.data;
};