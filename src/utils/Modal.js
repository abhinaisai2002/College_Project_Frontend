import React from 'react';
import ReactDOM from "react-dom";
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';


import { modalActions } from '../redux/reducers/modalSlice';


const ModalComp = ()=>{

    const modalState = useSelector(state => state.modal);    

    const dispatch = useDispatch();

    const handleClose = ()=>{
        dispatch(modalActions.closeModal());
    }


    return (
        ReactDOM.createPortal(
            <Modal show={modalState.showModal} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Ooooops!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalState.modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>,
            document.getElementById('portal')
        )
    );
}

export default ModalComp;