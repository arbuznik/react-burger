import React, { FC, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import HomePage from "../../pages/home/HomePage";
import Layout from "../layout/Layout";
import LoginPage from "../../pages/login/LoginPage";
import RegisterPage from "../../pages/register/RegisterPage";
import ForgotPasswordPage from "../../pages/forgot-password/ForgotPasswordPage";
import ResetPasswordPage from "../../pages/reset-password/ResetPasswordPage";
import ProfilePage from "../../pages/profile/ProfilePage";
import NotFoundPage from "../../pages/not-found/NotFoundPage";
import { getCurrentUser, getUser } from "../../services/slices/user";
import ProtectedRoute from "../protected-route/ProtectedRoute";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import Modal from "../modal/Modal";
import { resetActiveIngredient } from "../../services/slices/ingredient";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Feed from "../../pages/feed/Feed";
import OrdersPage from "../../pages/orders/OrdersPage";
import {
  fetchIngredients,
  getIngredients,
} from "../../services/slices/ingredients";
import OrderPage from "../../pages/order/OrderPage";

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getCurrentUser);
  const ingredients = useAppSelector(getIngredients);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients]);

  const handleClose = () => {
    navigate(-1);
    dispatch(resetActiveIngredient());
  };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<ProfilePage />} />}
          ></Route>
          <Route
            path="/profile/orders"
            element={<ProtectedRoute element={<OrdersPage />} />}
          />
          <Route
            path="/profile/orders/:id"
            element={<ProtectedRoute element={<OrderPage />} />}
          />
          <Route
            path="/login"
            element={<ProtectedRoute onlyUnAuth element={<LoginPage />} />}
          />
          <Route
            path="/register"
            element={<ProtectedRoute onlyUnAuth element={<RegisterPage />} />}
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRoute onlyUnAuth element={<ForgotPasswordPage />} />
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRoute onlyUnAuth element={<ResetPasswordPage />} />
            }
          />
          <Route path="/feed" element={<ProtectedRoute element={<Feed />} />} />
          <Route
            path="/feed/:id"
            element={<ProtectedRoute element={<OrderPage />} />}
          />
          <Route
            path="/ingredients/:id"
            element={<IngredientDetails outsideModal />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={handleClose} title="Детали ингредиента">
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
