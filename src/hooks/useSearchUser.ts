import { useState } from "react";
import type { SearchUserItem, SearchUserResponse } from "../types/github";

export const useSearchUser = () => {
  const [usersResult, setUsersResult] = useState<SearchUserItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const searchUser = async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${encodeURIComponent(trimmed)}`
      );

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("Límite de peticiones de GitHub excedido. Intenta más tarde.");
        }
        throw new Error(`Error en la búsqueda (${response.status}): ${response.statusText}`);
      }

      const data: SearchUserResponse = await response.json();
      setUsersResult(data.items || []);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error inesperado al buscar usuarios";
      setError(message);
      setUsersResult([]);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setUsersResult([]);
    setError(null);
    setHasSearched(false);
  };

  return {
    usersResult,
    loading,
    error,
    hasSearched,
    searchUser,
    clearResults,
  };
};

export default useSearchUser;
