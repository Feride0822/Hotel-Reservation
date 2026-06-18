import api from "./api";

export const loginWithEmail = async (data) => {
  const res = await api.post("/auth/login", data);
  console.log("LOGIN RESPONSE:", res.data); 
  return res.data;
};

export const sendOtp = async (data) => {
  const res = await api.post("/auth/send-otp", data);
  return res.data;
};

export const loginWithPhone = async (data) => {
  const res = await api.post("/auth/verify-otp", data);
  return res.data;
};

export const getUserProfile = async () => {
  const res = await api.get("/users/me");
  return res.data;
};

export const updateUserProfile = async (data) => {
  const res = await api.put("/users/me", data);
  return res.data;
};

export const registerWithEmail = async (data) => {
  const res = await api.post("/auth/register", data);
  console.log("REGISTER RESPONSE:", res.data); // debug
  return res.data;
};