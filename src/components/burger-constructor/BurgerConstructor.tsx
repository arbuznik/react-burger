import React, { FC, useEffect, useState } from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import Modal from "../modal/Modal";
import OrderDetails from "../order-details/OrderDetails";
import {
  createOrder,
  getOrder,
  getOrderIsLoading,
} from "../../services/slices/order";
import {
  addIngredient,
  getConstructorBun,
  getConstructorFillings,
  getTotalPrice,
  resetConstructor,
} from "../../services/slices/ingredients-constructor";
import { useDrop } from "react-dnd";
import { getStarterBun } from "../../services/slices/ingredients";
import BurgerConstructorFilling from "../burger-constructor-filling/BurgerConstructorFilling";
import { nanoid } from "@reduxjs/toolkit";
import { getCurrentUser } from "../../services/slices/user";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { IIngredient } from "../../types/types";

const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getCurrentUser);
  const isOrderLoading = useAppSelector(getOrderIsLoading);
  const navigate = useNavigate();
  const starterBun = useAppSelector(getStarterBun);
  const bun = useAppSelector(getConstructorBun);
  const fillings = useAppSelector(getConstructorFillings);
  const order = useAppSelector(getOrder);
  const totalPrice = useAppSelector(getTotalPrice);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [, dropTargetRef] = useDrop({
    accept: "ingredient",
    drop(ingredient: IIngredient) {
      handleOnDrop(ingredient);
    },
  });

  const handleOnDrop = (ingredient: IIngredient) => {
    dispatch(
      addIngredient({
        ...ingredient,
        uuid: nanoid(10),
      })
    );
  };

  useEffect(() => {
    if (starterBun && !bun) {
      dispatch(addIngredient(starterBun));
    }
  }, [starterBun, dispatch, bun]);

  const handleClick = () => {
    if (!user) {
      navigate("/login");
    } else if (bun) {
      setIsModalVisible(true);
      dispatch(
        createOrder({
          ingredients: [
            bun._id,
            ...fillings.map((filling) => filling._id),
            bun._id,
          ],
        })
      );
    }
  };

  const handleClose = () => {
    dispatch(resetConstructor());
    setIsModalVisible(false);
  };

  return (
    <>
      <section className={styles.constructorContainer}>
        <div ref={dropTargetRef} className={styles.ingredientsContainer}>
          {bun && (
            <div className={styles.bunContainer}>
              <ConstructorElement
                text={bun.name}
                thumbnail={bun.image}
                price={bun.price}
                type={"top"}
                isLocked
              />
            </div>
          )}

          <div className={styles.fillingsContainer}>
            {fillings.map((filling, index) => (
              <div key={filling.uuid} className={styles.ingredientContainer}>
                <BurgerConstructorFilling filling={filling} index={index} />
              </div>
            ))}
          </div>

          {bun && (
            <div className={styles.bunContainer}>
              <ConstructorElement
                text={bun.name}
                thumbnail={bun.image}
                price={bun.price}
                type={"bottom"}
                isLocked
              />
            </div>
          )}
        </div>

        <div className={styles.checkout}>
          <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
          <CurrencyIcon type={"primary"} />
          <Button
            extraClass="ml-10"
            htmlType="button"
            type="primary"
            size="medium"
            onClick={handleClick}
            disabled={isOrderLoading}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
      {isModalVisible && (
        <Modal onClose={handleClose}>
          <OrderDetails orderId={order?.order?.number} />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
