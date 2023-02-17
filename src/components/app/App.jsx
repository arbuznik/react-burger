import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../../pages/home/HomePage";
import Layout from "../layout/Layout";
import LoginPage from "../../pages/login/LoginPage";
import RegisterPage from "../../pages/register/RegisterPage";
import ForgotPasswordPage from "../../pages/forgot-password/ForgotPasswordPage";
import ResetPasswordPage from "../../pages/reset-password/ResetPasswordPage";
import ProfilePage from "../../pages/profile/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
