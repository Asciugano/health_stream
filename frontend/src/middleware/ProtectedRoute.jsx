import React, { useEffect } from "react";
import { getUserIDFromToken } from "../utils/token";

function ProtectedRoute({ token, Component, componentProps, setUser_id }) {
  useEffect(() => {
    if (!token) return;
    const id = getUserIDFromToken(token);
    if (id) setUser_id(id);
  }, [token, setUser_id]);

  if (!token) {
    return <p>Devi essere loggato per vedere questa pagina</p>;
  }

  const user_id = getUserIDFromToken(token);
  if (!user_id) return <p>Token non valido</p>;

  return <Component {...componentProps} token={token} user_id={user_id} />;
}

export default ProtectedRoute;
