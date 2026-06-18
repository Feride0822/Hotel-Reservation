import api from "./api";

// GET /rooms?hotel_id=:hotelId
export const getRooms = async (hotelId) => {
  const res = await api.get("/rooms", { params: { hotel_id: hotelId } });
  return res.data; // array of rooms
};

// GET /rooms/:id
export const getRoom = async (roomId) => {
  const res = await api.get(`/rooms/${roomId}`);
  return res.data;
};

// GET /rooms/:id/availability?check_in=&check_out=
export const checkRoomAvailability = async (roomId, checkIn, checkOut) => {
  const res = await api.get(`/rooms/${roomId}/availability`, {
    params: { check_in: checkIn, check_out: checkOut },
  });
  return res.data;
};