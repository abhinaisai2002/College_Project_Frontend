import React from "react";

import { Modal, Button } from "react-bootstrap";
import LordIcon from "../lordIcons/LordIcon";

import "./ModalComponent.scss";

const ModalComponent = ({
  show,
  handleClose,
  title,
  body,
  footer,
  size = "lg",
}) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size={size}
      aria-labelledby="contained-modal-title-vcenter"
      closeVariant="red"
      centered
      backdropClassName="custom-modal-backdrop"
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
        <button onClick={handleClose}>
          <LordIcon icon="close" />
        </button>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>{footer}</Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
