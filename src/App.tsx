import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ResultSetWrapper from "./components/Results/ResultSetWrapper";
import ResultItem from "./components/Results/ResultItem";
import UserInfo from "./components/UserInfo/UserInfo";
import useSearchUser from "./hooks/useSearchUser";
import useUserInfo from "./hooks/useUserInfo";
import type { SearchUserItem } from "./types/github";
import styles from "./App.module.css";

function App() {
  const { usersResult, loading: isSearching, searchUser, hasSearched } = useSearchUser();
  const { userInfo, loading: isLoadingUser, error: userError, getUserInfo } = useUserInfo();

  // Estado para el usuario seleccionado
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  // Manejador del botón de búsqueda
  const handleSearch = (term: string) => {
    searchUser(term);
  };

  // Manejador del botón de ojo (detalles)
  const handleDetailsClick = (item: SearchUserItem) => {
    setSelectedUser(item.login);
  };

  // useEffect que se dispara únicamente cuando cambia selectedUser
  useEffect(() => {
    if (selectedUser) {
      getUserInfo(selectedUser);
    }
  }, [selectedUser]);

  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <span>🔍</span> Buscador de Usuarios de GitHub
        </h1>
        <p className={styles.subtitle}>
          Encuentra usuarios en GitHub, revisa sus perfiles y consulta sus detalles en tiempo real.
        </p>
      </header>

      <main className={styles.mainLayout}>
        {/* Columna Izquierda: Búsqueda y Resultados */}
        <section className={styles.searchColumn}>
          <SearchBar onSearch={handleSearch} loading={isSearching} />

          {hasSearched && (
            <div className={styles.resultsHeader}>
              <span>Resultados de la búsqueda:</span>
              <span className={styles.resultsBadge}>{usersResult.length} encontrados</span>
            </div>
          )}

          {isSearching ? (
            <div className={styles.loadingResults}>
              <span className={styles.emptyStateIcon}>⏳</span>
              <span>Buscando usuarios en GitHub...</span>
            </div>
          ) : usersResult.length > 0 ? (
            <ResultSetWrapper>
              {usersResult.map((user) => (
                <ResultItem
                  key={user.id}
                  item={user}
                  onDetailsClick={handleDetailsClick}
                  isSelected={selectedUser === user.login}
                />
              ))}
            </ResultSetWrapper>
          ) : hasSearched ? (
            <div className={styles.emptyStateMessage}>
              <span className={styles.emptyStateIcon}>😕</span>
              <p>No se encontraron usuarios que coincidan con la búsqueda.</p>
            </div>
          ) : (
            <div className={styles.emptyStateMessage}>
              <span className={styles.emptyStateIcon}>🔎</span>
              <p>Ingresa un nombre de usuario en la barra superior y presiona "Buscar".</p>
            </div>
          )}
        </section>

        {/* Columna Derecha: Detalles del Usuario */}
        <section className={styles.detailsColumn}>
          <UserInfo
            user={userInfo}
            loading={isLoadingUser}
            error={userError}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
