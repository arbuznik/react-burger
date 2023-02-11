import React, { useEffect, useState } from 'react';
import AppHeader from "../app-header/AppHeader";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import { IngredientsContext } from '../../utils/ingredientsContext';
import styles from "./App.module.css";
import api from "../../utils/api";

function App() {
    const [ingredients, setIngredients] = useState();

    useEffect(() => {
        api.fetchIngredients()
            .then(data => setIngredients(data))
    }, [])

    return (
        <>
            <AppHeader />
            {ingredients &&
                <main className={styles.main}>
                    <h1 className={styles.title + " text text_type_main-large mt-10 mb-5"}>Соберите бургер</h1>
                    <IngredientsContext.Provider value={ingredients}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </IngredientsContext.Provider>
                </main>}
        </>

    );
}

export default App;
