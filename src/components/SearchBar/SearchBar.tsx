import type { FC } from "react";
import useSearchBar from "../../hooks/useSearchBar";
import styles from "./SearchBar.module.css";

export interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  loading?: boolean;
  placeholder?: string;
}

export const SearchBar: FC<SearchBarProps> = ({
  onSearch,
  loading = false,
  placeholder = "Buscar usuario de GitHub... (ej. octocat)",
}) => {
  const { searchTerm, onSearchBarChange, handleOnSubmit } = useSearchBar({ onSearch });

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleOnSubmit} className={styles.searchForm}>
        <input
          type="text"
          value={searchTerm}
          onChange={onSearchBarChange}
          placeholder={placeholder}
          className={styles.searchInput}
          aria-label="Nombre de usuario a buscar"
          disabled={loading}
        />
        <button
          type="submit"
          className={styles.searchButton}
          disabled={loading || !searchTerm.trim()}
        >
          {loading ? (
            <>
              <span className={styles.buttonSpinner} />
              <span>Buscando...</span>
            </>
          ) : (
            <>
              <span>🔍</span>
              <span>Buscar</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
