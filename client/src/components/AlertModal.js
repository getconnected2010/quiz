import React from 'react'
import Modal from 'react-modal'
import { ButtonComponent } from './FormComponents'
import '../css/alertModal.css'
import { Transition } from 'react-transition-group'

Modal.setAppElement('#root')
const AlertModal = ({ openModal, setOpenModal, message, style }) => {
    return (
        <Transition in={openModal} timeout={5000}>
            {state => (
                <Modal className={`Modal ${style} ${state}`} isOpen={openModal}>
                    <h1>{message}</h1>
                    <ButtonComponent onClick={() => setOpenModal(false)} label={'Close'} />
                </Modal>
            )}
        </Transition>
    )
}

export default AlertModal
