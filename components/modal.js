import React, {useState, useEffect} from 'react';
import { Modal as BModal } from 'react-bootstrap'

const Modal = ({
    className = '',
    title='',
    show = false,
    onClose = () => {},
    children,
    ...props
}) => {    

    return (
        <BModal show={show} onHide={onClose} className={className} centered {...props}>
            <BModal.Body>
                <div className="modal-title d-flex justify-content-between align-items-center">
                    <div className="text-body-1-bold">{title}</div>
                    <div className="modal-close-btn" onClick={() => onClose()}>X</div>
                </div>                
                {children}
            </BModal.Body>
        </BModal>
    );
}

export default Modal;