import api from "./api";

// GET /users — list all users (super admin / guest admin)
export const getUsers = async (search = "", page = 1, limit = 20) => {
  const params = { page, limit };
  if (search) params.search = search;
  const res = await api.get("/users", { params });
  return res.data;
};

// PATCH /users/{user_id}/approve
export const approveUser = async (userId) => {
  const res = await api.patch(`/users/${userId}/approve`);
  return res.data;
};

// PATCH /users/{user_id}/reject
export const rejectUser = async (userId) => {
  const res = await api.patch(`/users/${userId}/reject`);
  return res.data;
};