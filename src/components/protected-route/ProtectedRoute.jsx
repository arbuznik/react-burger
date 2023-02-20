import React from "react";
import { useSelector } from "react-redux";
import {
  getAuthChecked,
  getCurrentUser,
  isUserLoading,
} from "../../services/slices/user";
import { Navigate } from "react-router-dom";
import styles from "./ProtectedRoute.module.css";
import Loader from "../loader/Loader";

const ProtectedRoute = ({ onlyUnAuth, element }) => {
  const user = useSelector(getCurrentUser);
  const isLoading = useSelector(isUserLoading);
  const authChecked = useSelector(getAuthChecked);

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
