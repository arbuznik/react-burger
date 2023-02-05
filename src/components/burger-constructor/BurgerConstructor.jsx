import React, { useEffect, useState } from 'react';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './BurgerConstructor.module.css';
import PropTypes from "prop-types";
import { ingredientType } from "../../types/prop-types";
import Modal from "../modal/Modal";
import OrderDetails from "../order-details/OrderDetails";

const BurgerConstructor = ({ ingredients }) => {
    const [totalPrice, setTotalPrice] = useState();
    const [orderId, setOrderId] = useState(34536);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [buns, setBuns] = useState([]);
    const [fillings, setFillings] = useState([]);

    useEffect(() => {
        setBuns(ingredients.filter(ingredient => ingredient.type === 'bun'))

        setFillings(ingredients.filter(ingredient => ingredient.type !== 'bun'))

        setTotalPrice(ingredients.reduce((sum, el) => (sum + el.price), 0))
    }, [ingredients])

    const handleClick = () => {
        setIsModalVisible(true)
    }

    const handleClose = () => {
        setIsModalVisible(false)
    }

    return (
        <>
            <section className={styles.ingredientsContainer}>
                {buns[0] &&
                    <div className={styles.bunContainer}>
                        <ConstructorElement
                            text={buns[0].name}
                            thumbnail={buns[0].image}
                            price={buns[0].price}
                            type={'top'}
                            isLocked
                        />
                    </div>}

                <div className={styles.fillingsContainer}>
                    {fillings.map((filling) => (
                        <div key={filling._id} className={styles.ingredientContainer}>
                            <DragIcon type={"primary"}/>
                            <ConstructorElement
                                text={filling.name}
                                thumbnail={filling.image}
                                price={filling.price}
                            />
                        </div>
                    ))}
                </div>

                {buns[1] &&
                    <div className={styles.bunContainer}>
                        <ConstructorElement
                            text={buns[1].name}
                            thumbnail={buns[1].image}
                            price={buns[1].price}
                            type={'bottom'}
                            isLocked
                        />
                    </div>}

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
    ingredients: PropTypes.arrayOf(ingredientType).isRequired,
}

export default BurgerConstructor;