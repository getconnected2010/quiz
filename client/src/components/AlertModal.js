import React, {useState} from 'react'
import Modal from 'react-modal'
import { ButtonComponent } from './FormComponents'
import '../css/alertModal.css'

Modal.setAppElement('#root')
const AlertModal = ({ openModal, setOpenModal, message, style}) => {
    console.log(message)
    return (
        <Modal className={`Modal ${style}`} isOpen={openModal}>
            <h1>{message}</h1>
            <ButtonComponent onClick={()=>setOpenModal(false)} label={'Close'}/>
        </Modal>
    )
}

export default AlertModal
