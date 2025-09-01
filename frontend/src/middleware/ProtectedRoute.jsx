import React, { useEffect } from "react";
import { getUserIDFromToken } from "../utils/token";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ token, Component, componentProps, setUser_id, redirectTo = '/login' }) {
  useEffect(() => {
    if (!token) return;
    const id = getUserIDFromToken(token);
    if (id) setUser_id(id);
  }, [token, setUser_id]);

  if (!token) {
    return <Navigate to={redirectTo} replace />;
  }

  const user_id = getUserIDFromToken(token);
  if (!user_id) return <Navigate to={redirectTo} replace />;

  return <Component {...componentProps} token={token} user_id={user_id} />;
}

export default ProtectedRoute;
