import React from 'react';
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "../../components/app/App.module.css";
import BurgerIngredients from "../../components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../../components/burger-constructor/BurgerConstructor";
import { DndProvider } from "react-dnd";

const HomePage = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <main className={styles.main}>
                <h1 className={styles.title + " text text_type_main-large mt-10 mb-5"}>Соберите бургер</h1>
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
        </DndProvider>
    );
};

export default HomePage;