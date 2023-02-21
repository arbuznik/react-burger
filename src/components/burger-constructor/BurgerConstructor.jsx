import React, { useEffect, useState } from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import Modal from "../modal/Modal";
import OrderDetails from "../order-details/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getOrder } from "../../services/slices/order";
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

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);
  const navigate = useNavigate();
  const starterBun = useSelector(getStarterBun);
  const bun = useSelector(getConstructorBun);
  const fillings = useSelector(getConstructorFillings);
  const order = useSelector(getOrder);
  const totalPrice = useSelector(getTotalPrice);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [, dropTargetRef] = useDrop({
    accept: "ingredient",
    drop(ingredient) {
      handleOnDrop(ingredient);
    },
  });

  const handleOnDrop = (ingredient) => {
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
    } else {
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
          >
            Оформить заказ
          </Button>
        </div>
      </section>
      {isModalVisible && order?.order?.number && (
        <Modal onClose={handleClose}>
          <OrderDetails orderId={order.order.number} />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
