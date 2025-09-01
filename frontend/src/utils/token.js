import { jwtDecode } from "jwt-decode";

export function getUserIDFromToken(token) {
  if (!token || typeof (token) !== "string") return null
  try {
    const decoded = jwtDecode(token);
    return decoded.id || decoded.sub || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

