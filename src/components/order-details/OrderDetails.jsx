import React from 'react';
import styles from './OrderDetails.module.css';
import checkmarkPath from '../../images/checkmark.svg';
import PropTypes from "prop-types";

const OrderDetails = ({ orderId }) => {
    return (
        <div className={styles.container}>
            <p className={"text text_type_digits-large mb-8"}>{orderId}</p>
            <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
            <div className={styles.checkmark}>
                <img src={checkmarkPath} alt="Order received" />
            </div>
            <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
    );
};

OrderDetails.propTypes = {
    orderId: PropTypes.number.isRequired,
}

export default OrderDetails;