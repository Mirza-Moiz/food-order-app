import React, { useRef, useState } from 'react'
import styles from './Checkout.module.css'


const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.length === 5;

const Checkout = (props) => {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        postal: true,
        city: true
    })

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();


    const confirmHandler = (event) => {

        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalIsValid = isFiveChars(enteredPostal);

        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postal: enteredPostalIsValid,
            city: enteredCityIsValid
        })
        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalIsValid;
        if (!formIsValid) {
            return
        }
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postal: enteredPostal
        })
    }
    const nameControlclasses = `${styles.control} ${!formInputValidity.name ? styles.invalid : ''}`
    const streetControlclasses = `${styles.control} ${!formInputValidity.street ? styles.invalid : ''}`
    const postalControlclasses = `${styles.control} ${!formInputValidity.postal ? styles.invalid : ''}`
    const cityControlclasses = `${styles.control} ${!formInputValidity.city ? styles.invalid : ''}`
    return (
        <form className={nameControlclasses} onSubmit={confirmHandler}>
            <div className={styles.control}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputValidity.name && <p>Please Enter a Valid name</p>}
            </div>
            <div className={streetControlclasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputValidity.street && <p>Please Enter a Valid street number</p>}
            </div>
            <div className={postalControlclasses}>
                <label htmlFor='postal'>Postal code</label>
                <input type='text' id='postal' ref={postalInputRef} />
                {!formInputValidity.postal && <p>Please Enter a valid Postal Code</p>}
            </div>
            <div className={cityControlclasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formInputValidity.city && <p>Please Enter a Valid city name</p>}
            </div>
            <div className={styles.actions}>
                <button type='button' onClick={props.onCancel}>Cancel</button>
                <button className={styles.submit}>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout