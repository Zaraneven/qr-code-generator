import React, { useEffect, useState } from "react";
import { removeQrcode } from "../api/qcode";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalDelete = ({ modal1, del, title, setModal1 }) => {
  const [mod1, setMod1] = useState(false);

  useEffect(() => {
    setModal1(false);
    setTimeout(() => {
      if (mod1) {
        deletQr();
        setMod1(false);
      }
    }, 2000);
    // eslint-disable-next-line
  }, [mod1]);

  const deletQr = () => {
    removeQrcode(del);
    setMod1(true);
  };

  return (
    <>
      <Modal show={modal1} onHide={() => setModal1(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete !</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModal1(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setMod1(true)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={mod1}>
        <Modal.Body className="modalDel">
          <h2>The QR Code {title} was deleted successfuly!</h2>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalDelete;
