import React, { useEffect } from 'react';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './BurgerIngredients.module.css';
import { getActiveCategories, categoriesNames, getIngredientsByCategory } from "../../utils/categories";
import BurgerIngredient from "../burger-ingredient/BurgerIngredient";
import { useSelector } from "react-redux";
import { getIngredients } from "../../services/slices/ingredients";

const BurgerIngredients = () => {
    const ingredients = useSelector(getIngredients);

    const [currentCategory, setCurrentCategory] = React.useState('bun');
    const [activeCategories, setActiveCategories] = React.useState([]);

    useEffect(() => {
        setActiveCategories(getActiveCategories(ingredients));
    }, [ingredients])

    const handleTabClick = (category) => {
        setCurrentCategory(category);

        const categoryHeader = document.getElementById(category);
        categoryHeader.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <section>
            <div className={styles.tabs + ' mb-10'}>
                {activeCategories.map((category, index) => (
                    <Tab key={index} value={category} active={currentCategory === category} onClick={handleTabClick}>
                        {categoriesNames[category]}
                    </Tab>
                ))}
            </div>

            <div className={styles.categoriesContainer}>
                {activeCategories.map((category, index) => (
                    <div key={index}>
                        <h2 id={category} className="text text_type_main-medium">{categoriesNames[category]}</h2>
                        <div className={styles.ingredientsContainer}>
                            {getIngredientsByCategory(ingredients, category).map(ingredient => (
                                <BurgerIngredient key={ingredient._id} ingredient={ingredient} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BurgerIngredients;