import React, {useContext} from "react";

import { Modal } from "react-bootstrap";
import LordIcon from "../lordIcons/LordIcon";

import { ThemeContext } from "../../../contexts/ThemeContext";


import "./ModalComponent.scss";

const ModalComponent = ({
  show,
  handleClose,
  title,
  body,
  footer,
}) => {
  const { theme } = useContext(ThemeContext);


  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdropClassName="custom-modal-backdrop"
      dialogClassName={`${theme}`}
      contentClassName={`${theme}`}
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
