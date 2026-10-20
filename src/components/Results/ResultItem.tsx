import type { FC } from "react";
import type { SearchUserItem } from "../../types/github";
import styles from "./results.module.css";

export interface ResultItemProps {
  item: SearchUserItem;
  onDetailsClick: (item: SearchUserItem) => void;
  isSelected?: boolean;
}

export const ResultItem: FC<ResultItemProps> = ({ item, onDetailsClick, isSelected = false }) => {
  return (
    <div className={`${styles.resultItem} ${isSelected ? styles.selectedItem : ""}`}>
      <div className={styles.userInfoContainer}>
        <img
          src={item.avatar_url}
          alt={`Avatar de ${item.login}`}
          className={styles.avatar}
          loading="lazy"
        />
        <div>
          <div className={styles.loginName}>{item.login}</div>
          <div className={styles.userType}>{item.type}</div>
        </div>
      </div>

      <button
        type="button"
        className={styles.detailsButton}
        onClick={() => onDetailsClick(item)}
        title={`Ver detalles de ${item.login}`}
        aria-label={`Ver detalles de ${item.login}`}
      >
        <span className={styles.eyeIcon} aria-hidden="true">
          👁️
        </span>
        <span>Detalles</span>
      </button>
    </div>
  );
};

export default ResultItem;
