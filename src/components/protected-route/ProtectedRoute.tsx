import React, { FC, ReactElement } from "react";
import {
  getAuthChecked,
  getCurrentUser,
  isUserLoading,
} from "../../services/slices/user";
import { Navigate } from "react-router-dom";
import styles from "./ProtectedRoute.module.css";
import Loader from "../loader/Loader";
import { useAppSelector } from "../../hooks/hooks";

interface IProtectedRouteProps {
  onlyUnAuth?: boolean;
  element: ReactElement;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ onlyUnAuth, element }) => {
  const user = useAppSelector(getCurrentUser);
  const isLoading = useAppSelector(isUserLoading);
  const authChecked = useAppSelector(getAuthChecked);

  if (!authChecked || isLoading) {
    return (
      <main className={styles.main}>
        <Loader />
      </main>
    );
  }

  if (user && onlyUnAuth) {
    return <Navigate to="/" />;
  }

  if (!user && !onlyUnAuth) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
