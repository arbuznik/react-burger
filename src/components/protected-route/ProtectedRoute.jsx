import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCurrentUser, isUserLoading } from "../../services/slices/user";
import { useNavigate } from "react-router-dom";
import styles from "./ProtectedRoute.module.css";
import Loader from "../loader/Loader";

const ProtectedRoute = ({ onlyUnAuth, element }) => {
  const navigate = useNavigate();
  const user = useSelector(getCurrentUser);
  const isLoading = useSelector(isUserLoading);

  useEffect(() => {
    if (!user && !isLoading && !onlyUnAuth) {
      navigate("/login");
    }

    if (user && onlyUnAuth) {
      navigate("/");
    }
  }, [user, navigate, isLoading, onlyUnAuth]);

  if (isLoading) {
    return (
      <main className={styles.main}>
        <Loader />
      </main>
    );
  }

  return element;
};

export default ProtectedRoute;
