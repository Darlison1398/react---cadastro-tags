import { jwtDecode } from "jwt-decode";

export function getUserFromToken() {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        return decodedToken;  // Retorna o objeto decodificado completo
      } catch (error) {
        console.error("Falha ao decodificar o token:", error);
        return null;
      }
    }
    return null;
  }