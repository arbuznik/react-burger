import React, { FC } from "react";
import styles from "./IngredientThumbnail.module.css";
import { MAX_INGREDIENTS_FOR_DISPLAY } from "../../utils/constants";
import clsx from "clsx";

interface IIngredientThumbnailProps {
  url: string;
  index: number;
  last: boolean;
  count: number;
}

const IngredientThumbnail: FC<IIngredientThumbnailProps> = ({
  url,
  index,
  last,
  count,
}) => {
  return (
    <div
      className={styles.container}
      style={{
        zIndex: `${MAX_INGREDIENTS_FOR_DISPLAY - index}`,
        left: `${index * 50}px`,
      }}
    >
      <img className={styles.img} src={url} alt="ingredient" />
      {last && count && (
        <div className={clsx(styles.overlay, "text_type_main-default")}>
          +{count}
        </div>
      )}
    </div>
  );
};

export default IngredientThumbnail;
