import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import AppHeader from "../app-header/AppHeader";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import styles from "./App.module.css";
import { fetchIngredients } from "../../services/slices/ingredients";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch])

    return (
        <>
            <AppHeader />
            <main className={styles.main}>
                <h1 className={styles.title + " text text_type_main-large mt-10 mb-5"}>Соберите бургер</h1>
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
        </>

    );
}

export default App;
