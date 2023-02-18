import React, { createRef, useEffect, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import {
  getActiveCategories,
  categoriesNames,
  getIngredientsByCategory,
} from "../../utils/categories";
import BurgerIngredient from "../burger-ingredient/BurgerIngredient";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchIngredients,
  getIngredients,
} from "../../services/slices/ingredients";

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(getIngredients);
  const [currentCategory, setCurrentCategory] = React.useState("bun");
  const [activeCategories, setActiveCategories] = React.useState([]);

  const scrollAreaRef = useRef();
  const categoryRefs = activeCategories.map(createRef);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    setActiveCategories(getActiveCategories(ingredients));
  }, [ingredients]);

  useEffect(() => {
    let visibleHeaders = {};

    let observer = new IntersectionObserver(
      (IntersectionObserverEntry) => {
        for (const entry of IntersectionObserverEntry) {
          visibleHeaders[entry.target.id] = entry.isIntersecting;
        }

        for (const header in visibleHeaders) {
          if (visibleHeaders[header]) {
            setCurrentCategory(header);
            break;
          }
        }
      },
      { root: scrollAreaRef.current }
    );

    for (const ref of categoryRefs) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [categoryRefs]);

  const handleTabClick = (category) => {
    setCurrentCategory(category);

    const categoryHeader = document.getElementById(category);
    categoryHeader.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={scrollAreaRef}>
      <div className={styles.tabs + " mb-10"}>
        {activeCategories.map((category, index) => (
          <Tab
            key={index}
            value={category}
            active={currentCategory === category}
            onClick={handleTabClick}
          >
            {categoriesNames[category]}
          </Tab>
        ))}
      </div>

      <div className={styles.categoriesContainer}>
        {activeCategories.map((category, index) => (
          <div key={index}>
            <h2
              ref={categoryRefs[index]}
              id={category}
              className="text text_type_main-medium"
            >
              {categoriesNames[category]}
            </h2>
            <div className={styles.ingredientsContainer}>
              {getIngredientsByCategory(ingredients, category).map(
                (ingredient) => (
                  <BurgerIngredient
                    key={ingredient._id}
                    ingredient={ingredient}
                  />
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BurgerIngredients;
