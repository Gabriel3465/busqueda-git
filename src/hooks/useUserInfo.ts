import { useState } from "react";
import type { UserInfoResponse } from "../types/github";

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfoResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getUserInfo = async (username: string) => {
    const trimmed = username.trim();
    if (!trimmed) {
      setUserInfo(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.github.com/users/${encodeURIComponent(trimmed)}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Usuario no encontrado en GitHub.");
        }
        if (response.status === 403) {
          throw new Error("Límite de peticiones de GitHub excedido. Intenta más tarde.");
        }
        throw new Error(`Error al obtener información (${response.status})`);
      }

      const data: UserInfoResponse = await response.json();
      setUserInfo(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al obtener información del usuario";
      setError(message);
      setUserInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const clearUserInfo = () => {
    setUserInfo(null);
    setError(null);
    setLoading(false);
  };

  return {
    userInfo,
    loading,
    error,
    getUserInfo,
    clearUserInfo,
  };
};

export default useUserInfo;
