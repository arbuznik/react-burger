import React, { useRef } from 'react';
import { ingredientType } from "../../types/prop-types";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { removeIngredientById, sortIngredients } from "../../services/slices/ingredients-constructor";
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

            const dragId = item.id
            const hoverId = filling.constructorIngredientId

            const dragIndex = item.index
            const hoverIndex = index

            if (dragId === hoverId) {
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

            dispatch(sortIngredients({ dragId, hoverId }))
        },
    })

    const [{ isDragging }, dragRef, dragPreview] = useDrag({
        type: 'constructorIngredient',
        item: {
            id: filling.constructorIngredientId,
            index,
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0.5 : 1;
    drop(dragPreview(dropRef));

    const handleDeleteIngredient = (id) => {
        dispatch(removeIngredientById(id))
    }

    return (
        <div ref={dropRef} style={{opacity}} className={styles.fillingContainer}>
            <div ref={dragRef} className={styles.dragHandle}>
                <DragIcon type={"primary"} />
            </div>
            <ConstructorElement
                text={filling.name}
                thumbnail={filling.image}
                price={filling.price}
                handleClose={() => handleDeleteIngredient(filling.constructorIngredientId)}
            />
        </div>
    );
};

BurgerConstructorFilling.propTypes = {
    filling: ingredientType.isRequired,
}

export default BurgerConstructorFilling;