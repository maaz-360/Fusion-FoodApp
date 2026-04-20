import { jwtDecode } from "jwt-decode";

const decodeJWT = (token) => {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};

export const isTokenExpired = (token) => {
  const decodedToken = decodeJWT(token);
  return !decodedToken?.exp || decodedToken.exp * 1000 < Date.now();
};

export const getUserInfoFromToken = (token) => {
  const decodedToken = decodeJWT(token);
  if (!decodedToken) return null;

  return {
    id: decodedToken.id,
    name: decodedToken.fullname,
    email: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
    role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
    exp: decodedToken.exp,
  };
};