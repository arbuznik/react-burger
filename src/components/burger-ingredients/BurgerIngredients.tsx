import React, { createRef, FC, useEffect, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import {
  getActiveCategories,
  getIngredientsByCategory,
} from "../../utils/helpers";
import BurgerIngredient from "../burger-ingredient/BurgerIngredient";
import { getIngredients } from "../../services/slices/ingredients";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import { categoriesNames } from "../../utils/constants";

const BurgerIngredients: FC = () => {
  const location = useLocation();
  const ingredients = useAppSelector(getIngredients);
  const [currentCategory, setCurrentCategory] = React.useState<string>("bun");
  const [activeCategories, setActiveCategories] = React.useState<string[]>([]);

  const scrollAreaRef = useRef<HTMLElement>(null);
  const categoryRefs = activeCategories.map(createRef<HTMLHeadingElement>);

  useEffect(() => {
    setActiveCategories(getActiveCategories(ingredients));
  }, [ingredients]);

  useEffect(() => {
    let visibleHeaders: {
      [name: string]: boolean;
    } = {};

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
      if (ref.current) {
        observer.observe(ref.current);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, [categoryRefs]);

  const handleTabClick = (category: string) => {
    setCurrentCategory(category);

    const categoryHeader = document.getElementById(category);
    if (categoryHeader) {
      categoryHeader.scrollIntoView({ behavior: "smooth" });
    }
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
            <div className={styles.ingredientsContainer} data-cy={category}>
              {getIngredientsByCategory(ingredients, category).map(
                (ingredient) => (
                  <Link
                    className={styles.link}
                    key={ingredient._id}
                    to={`/ingredients/${ingredient._id}`}
                    state={{ backgroundLocation: location }}
                    data-cy={"IngredientLink"}
                  >
                    <BurgerIngredient ingredient={ingredient} />
                  </Link>
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
