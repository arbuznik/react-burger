import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../../pages/home/HomePage";
import Layout from "../layout/Layout";
import LoginPage from "../../pages/login/LoginPage";
import RegisterPage from "../../pages/register/RegisterPage";
import ForgotPasswordPage from "../../pages/forgot-password/ForgotPasswordPage";
import ResetPasswordPage from "../../pages/reset-password/ResetPasswordPage";
import ProfilePage from "../../pages/profile/ProfilePage";
import IngredientPage from "../../pages/ingredient/IngredientPage";
import NotFoundPage from "../../pages/not-found/NotFoundPage";
import { getCurrentUser, getUser } from "../../services/slices/user";
import { useDispatch, useSelector } from "react-redux";
import jsCookie from "js-cookie";
import ProtectedRoute from "../protected-route/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);

  useEffect(() => {
    if (!user && jsCookie.get("refreshToken")) {
      dispatch(getUser());
    }
  }, [user, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<ProfilePage />} />}
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
          <Route path="/ingredient/:id" element={<IngredientPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
