// api/userService.js
import api from "./api";

// Get all users
export const getUsers = async (search = "") => {
  const response = await api.get(`/users?search=${search}`);
  return response.data;
};

// Approve user
export const approveUser = async (id) => {
  const response = await api.patch(`/users/${id}/approve`);
  return response.data;
};

// Reject user
export const rejectUser = async (id) => {
  const response = await api.patch(`/users/${id}/reject`);
  return response.data;
};