import React from 'react'
import styles from './Cart.module.css'
import Modal from '../UI/Modal'

const Cart = (props) => {
    const CartItems = <ul className={styles['cart-items']}>
        {[{
            id: 'c1',
            name: 'Sushi',
            amount: '2',
            price: '10'
        }].map((item) =>
            <li>{item.name}</li>)}
    </ul>
    return (
        <Modal onClose={props.onHideCart}>
            {CartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>45.34</span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={props.onHideCart}>Close</button>
                <button className={styles.button}>Order</button>
            </div>
        </Modal>
    )
}

export default Cart