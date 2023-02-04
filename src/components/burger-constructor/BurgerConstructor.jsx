import React, { useState } from 'react';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './BurgerConstructor.module.css';
import PropTypes from "prop-types";
import { ingredientType } from "../../types/prop-types";
import Modal from "../modal/Modal";
import OrderDetails from "../order-details/OrderDetails";

const BurgerConstructor = ({ ingredients }) => {
    const totalPrice = ingredients.reduce((sum, el) => (sum + el.price), 0);
    const [orderId, setOrderId] = useState(34536);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleClick = () => {
        setIsModalVisible(true)
    }

    const handleClose = () => {
        setIsModalVisible(false)
    }

    return (
        <>
            <section className={styles.ingredientsContainer}>
                {ingredients.map((ingredient, index, arr) => (
                    <div key={ingredient._id} className={styles.ingredientContainer}>
                        {index !== 0 && index !== arr.length - 1 && <DragIcon type={"primary"}/>}
                        <ConstructorElement
                            type={index === 0 ? 'top' : index === arr.length - 1 ? 'bottom' : 'undefined'}
                            isLocked={index === 0 || index === arr.length - 1}
                            text={ingredient.name}
                            thumbnail={ingredient.image}
                            price={ingredient.price}
                        />
                    </div>
                ))}

                <div className={styles.checkout}>
                    <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
                    <CurrencyIcon type={"primary"} />
                    <Button extraClass="ml-10" htmlType="button" type="primary" size="medium" onClick={handleClick}>
                        Оформить заказ
                    </Button>
                </div>
            </section>
            {isModalVisible &&
                <Modal onClose={handleClose}>
                    <OrderDetails orderId={orderId} />
                </Modal>
            }
        </>
    );
};

BurgerConstructor.propTypes = {
    ingredient: PropTypes.arrayOf(ingredientType),
}

export default BurgerConstructor;