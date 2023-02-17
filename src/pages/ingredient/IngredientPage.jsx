import React from "react";
import { useParams } from "react-router-dom";
import styles from "./IngredientPage.module.css";

const IngredientPage = () => {
  const { id } = useParams();

  return (
    <main className={styles.main}>
      <p>ingredient page, id: {id}</p>
    </main>
  );
};

export default IngredientPage;
