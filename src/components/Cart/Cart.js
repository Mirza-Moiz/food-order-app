
import React, { useContext, useState } from 'react'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import styles from './Cart.module.css'
import Modal from '../UI/Modal'
import Checkout from './Checkout'

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setIDidSubmit] = useState(false);
    const [ischeckout, setIsCheckout] = useState(false)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    }
    const cartItemAddHandler = (item) => {
        cartCtx.addItem({
            ...item, amount: 1
        })
    }
    const orderHandler = () => {
        setIsCheckout(true)
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://food-order-app-4b994-default-rtdb.firebaseio.com/orders.json',
            {
                method: 'POST',
                body: JSON.stringify({
                    user: userData,
                    orderedItems: cartCtx.items
                })
            });
        setIsSubmitting(false);
        setIDidSubmit(true);
        cartCtx.clearCart();
    }

    const CartItems = <ul className={styles['cart-items']}>
        {cartCtx.items.map((item) =>
            <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}

            />)}
    </ul>
    const modalActions = (
        <div className={styles.actions}>
            <button className={styles['button--alt']} onClick={props.onHideCart}>Close</button>
            {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
        </div>)
    const cartModalContent = (
        <React.Fragment>
            {CartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {ischeckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart} />}
            {!ischeckout && modalActions}
        </React.Fragment>)

    const isSubmittingModalContent = (<p>Sending Order data...</p>)

    const didSubitModalContent = (
        <React.Fragment>
            <p>Successfully sent the order.</p>
            <div className={styles.actions}>
                <button className={styles.button} onClick={props.onHideCart}>Close</button>
            </div>
        </React.Fragment>)
    return (
        <Modal onClose={props.onHideCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubitModalContent}

        </Modal>
    )
}

export default Cart