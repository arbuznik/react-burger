import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../../pages/home/HomePage";
import Layout from "../layout/Layout";
import LoginPage from "../../pages/login/LoginPage";
import RegisterPage from "../../pages/register/RegisterPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
