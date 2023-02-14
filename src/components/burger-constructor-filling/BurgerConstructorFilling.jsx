import React, { useRef } from 'react';
import { ingredientType } from "../../types/prop-types";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
    removeFilling,
    sortIngredients
} from "../../services/slices/ingredients-constructor";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import styles from './BurgerConstructorFilling.module.css';

const BurgerConstructorFilling = ({ filling, index }) => {
    const dispatch = useDispatch();
    const dropRef = useRef();

    const [, drop] = useDrop({
        accept: 'constructorIngredient',
        hover(item, monitor) {
            if (!dropRef.current) {
                return
            }

            const dragIndex = item.index
            const hoverIndex = index

            if (dragIndex === hoverIndex) {
                return
            }

            const hoverBoundingRect = dropRef.current?.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            dispatch(sortIngredients({ dragIndex, hoverIndex }))
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag, dragPreview] = useDrag({
        type: 'constructorIngredient',
        item: {
            index,
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0.3 : 1;

    drop(drag(dragPreview(dropRef)));

    const handleDeleteFilling = (filling) => {
        dispatch(removeFilling(filling))
    }

    return (
        <div ref={dropRef} style={{opacity}} className={styles.fillingContainer}>
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

BurgerConstructorFilling.propTypes = {
    filling: ingredientType.isRequired,
}

export default BurgerConstructorFilling;