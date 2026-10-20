import type { FC, ReactNode } from "react";
import styles from "./results.module.css";

export interface ResultSetWrapperProps {
  children: ReactNode;
}

export const ResultSetWrapper: FC<ResultSetWrapperProps> = ({ children }) => {
  return <div className={styles.resultSetWrapper}>{children}</div>;
};

export default ResultSetWrapper;
