// components/ProtectedRoute.jsx
import { Navigate } from "react-router";

export function ProtectedRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/signin" />;

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" />; // or unauthorized page
  }

  return children;
}