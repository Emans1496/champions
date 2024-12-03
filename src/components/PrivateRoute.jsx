// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  console.log("Current User in PrivateRoute:", currentUser);

  return currentUser ? children : <Navigate to="/login" />;
}
