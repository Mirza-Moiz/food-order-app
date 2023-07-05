import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import styles from './Modal.module.css'

const BackDrop = () => {
    return (
        <div className={styles.backdrop} />
    )
}
const ModalOverlay = (props) => {
    return (
        <div className={styles.modal}>
            <div className={styles.content}>{props.children}</div>
        </div>
    )
}


const Modal = (props) => {
    const overlayElement = document.getElementById('overlay')
    return (
        <Fragment>
            {ReactDOM.createPortal(<BackDrop />, overlayElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, overlayElement)}
        </Fragment>
    )
}

export default Modal