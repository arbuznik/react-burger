import React, { useEffect } from 'react';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './BurgerIngredients.module.css';
import { getActiveCategories, categoriesNames, getIngredientsByCategory } from "../../utils/categories";
import BurgerIngredient from "../burger-ingredient/BurgerIngredient";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients, getIngredients } from "../../services/slices/ingredients";

const BurgerIngredients = () => {
    const dispatch = useDispatch();
    const ingredients = useSelector(getIngredients);
    const [currentCategory, setCurrentCategory] = React.useState('bun');
    const [activeCategories, setActiveCategories] = React.useState([]);

    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch])

    useEffect(() => {
        setActiveCategories(getActiveCategories(ingredients));
    }, [ingredients])

    const handleTabClick = (category) => {
        setCurrentCategory(category);

        const categoryHeader = document.getElementById(category);
        categoryHeader.scrollIntoView({ behavior: 'smooth' });
    }

    const handleIngredientsScroll = () => {
        const offset = 300;
        const proximity = 100;

        const categoryHeadersPos = activeCategories.map(category => {
            return {
                category,
                pos: document.getElementById(category).getBoundingClientRect().y - offset
            }
        });

        const closestToTop = categoryHeadersPos.reduce((prev, curr) => {
            return (Math.abs(curr.pos) < Math.abs(prev.pos) && curr.pos < proximity ? curr : prev);
        });

        setCurrentCategory(closestToTop.category)
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

            <div onScroll={handleIngredientsScroll} className={styles.categoriesContainer}>
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