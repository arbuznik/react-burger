import React, { FC } from "react";
import imagePath from "../../images/404.png";
import styles from "./NotFoundPage.module.css";

const NotFoundPage: FC = () => {
  return (
    <main className={styles.main}>
      <h1 className="text text_type_digits-large">404</h1>
      <img src={imagePath} alt="404" className={styles.image} />
    </main>
  );
};

export default NotFoundPage;
