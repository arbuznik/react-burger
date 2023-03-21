import React, { FC, useRef } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  removeFilling,
  sortIngredients,
} from "../../services/slices/ingredients-constructor";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import styles from "./BurgerConstructorFilling.module.css";
import { IIngredientWithUUID } from "../../types/types";
import { useAppDispatch } from "../../hooks/hooks";

interface IBurgerConstructorFillingProps {
  filling: IIngredientWithUUID;
  index: number;
}

const BurgerConstructorFilling: FC<IBurgerConstructorFillingProps> = ({
  filling,
  index,
}) => {
  const dispatch = useAppDispatch();
  const dropRef = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: "constructorIngredient",
    hover(
      item: {
        index: number;
      },
      monitor
    ) {
      if (!dropRef.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = dropRef.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(sortIngredients({ dragIndex, hoverIndex }));
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: "constructorIngredient",
    item: {
      index,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity: number = isDragging ? 0.3 : 1;

  drop(drag(dragPreview(dropRef)));

  const handleDeleteFilling = (filling: IIngredientWithUUID) => {
    dispatch(removeFilling(filling));
  };

  return (
    <div ref={dropRef} style={{ opacity }} className={styles.fillingContainer}>
      <DragIcon type={"primary"} />
      <ConstructorElement
        text={filling.name}
        thumbnail={filling.image}
        price={filling.price}
        handleClose={() => handleDeleteFilling(filling)}
      />
    </div>
  );
};

export default BurgerConstructorFilling;
