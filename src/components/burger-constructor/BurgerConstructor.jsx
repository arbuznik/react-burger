import React, { useContext, useEffect, useState } from 'react';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './BurgerConstructor.module.css';
import Modal from "../modal/Modal";
import OrderDetails from "../order-details/OrderDetails";
import { ConstructorContext } from "../../utils/ConstructorContext";
import api from "../../utils/api";

const BurgerConstructor = () => {
    const ingredients = useContext(ConstructorContext);

    const [totalPrice, setTotalPrice] = useState(0);
    const [orderId, setOrderId] = useState(34536);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [bun, setBun] = useState('');
    const [fillings, setFillings] = useState([]);

    useEffect(() => {
        setBun(ingredients.filter(ingredient => ingredient.type === 'bun')[0])

        setFillings(ingredients.filter(ingredient => ingredient.type !== 'bun'))
    }, [ingredients])

    useEffect(() => {
        setTotalPrice((fillings.reduce((sum, filling) => (sum + filling.price), 0) + bun.price * 2) || 0)
    }, [fillings, bun])

    const handleClick = () => {
        setIsModalVisible(true);
        api.createOrder({
            ingredients: [...fillings.map(filling => filling._id), bun._id]
        })
            .then(data => setOrderId(data.order.number));
    }

    const handleClose = () => {
        setIsModalVisible(false)
    }

    return (
        <>
            <section className={styles.ingredientsContainer}>
                {bun &&
                    <div className={styles.bunContainer}>
                        <ConstructorElement
                            text={bun.name}
                            thumbnail={bun.image}
                            price={bun.price}
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

                {bun &&
                    <div className={styles.bunContainer}>
                        <ConstructorElement
                            text={bun.name}
                            thumbnail={bun.image}
                            price={bun.price}
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

export default BurgerConstructor;