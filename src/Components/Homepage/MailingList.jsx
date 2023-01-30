import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const MailingList = ({ email, handleModal }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    handleModal();
  };
  const handleShow = () => {
    handleModal();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Subscribe to our Mailing list.</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          By clicking accept, you will be subscribing {email} to our mailing
          list.
        </Modal.Body>
        <Modal.Footer>
          {email.length === 0 ? (
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          ) : (
            <Button variant="primary">Subscribe</Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MailingList;
