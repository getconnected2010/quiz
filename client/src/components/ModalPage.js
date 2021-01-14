import React from 'react'
import Modal from 'react-modal'
import { ButtonComponent } from './FormComponents'
import '../css/modalPage.css'

Modal.setAppElement('#root')
const ModalPage = ({ openModal, setOpenModal, message, styleProp }) => {
    return (
        <Modal className={`Modal ${styleProp}`} isOpen={openModal}>
            <h1>{message}</h1>
            <ButtonComponent onClick={() => setOpenModal(false)} label={'Close'} />
        </Modal>
    )
}

export default ModalPage
