import QRCode from "qrcode";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { BsDownload } from "react-icons/bs";
import { insertQrcode } from "../api/qcode";
import { BsTrash } from "react-icons/bs";
import { RiArrowGoBackLine } from "react-icons/ri";
import validator from "validator";

function Generate({ show, setShow, setModal1 }) {
  const [url, setUrl] = useState("");
  const [qr, setQr] = useState("");
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [val, setVal] = useState("");
  const [valName, setValName] = useState("");
  const [error, setError] = useState("");
  const [err, setErr] = useState(false);

  const handleClose = () => {
    setShow(false);
    setUrl("");
    setTitle("");
    setQr("");
    setVal("");
    setError('')
    setErrorMessage('')
  };

  const GenerateQRCode = (e) => {
    if (title === "" || title.length < 2 || title.length > 25) {
      setError("Please enter title (min 2 and max 25 characters) !!!");
    }
     else if (err === false) {
      QRCode.toDataURL(
        url,
        {
          width: 800,
          margin: 2,
          color: {
            dark: "#335383FF",
            light: "#EEEEEEFF",
          },
        },
        (err, url) => {
          if (err) return console.error(err);

          console.log(url);
          setQr(url);
        }
      );

      e.preventDefault();
      if (title && url) {
        insertQrcode({ title: title, url: url });
      }
    }
  };

  const validate = (e) => {
    setVal(e.target.value);
    if (validator.isURL(val)) {
      setErrorMessage("Is Valid URL");
      setUrl(e.target.value);
    } else {
      setErrorMessage("Is Not Valid URL");
    }
  }; 
  

  function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/;
    return specialChars.test(str);
  }

  const validateName = (e) => {
    setValName(e.target.value);
    if (containsSpecialChars(valName)) {
      setError("Only letters and numbers !");
      setErr(true);
      return;
    } else {
      setTitle(e.target.value);
      setErr(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      {!qr && (
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Generate my QR Code</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  placeholder="QR Code Title"
                  value={title}
                  type="text"
                  autoFocus
                  onChange={validateName}
                />
                <span>{error}</span>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control 
                  type="type"
                  as="textarea"
                  rows={3}
                  placeholder="Enter URL for your QR Code ..."
                  value={val}
                  onChange={validate}
                />
                <span>{errorMessage}</span>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={GenerateQRCode}>
              Generate
            </Button>
          </Modal.Footer>
        </div>
      )}

      {qr && (
        <div>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img className="imgGenerate" src={qr} alt="code" />
          </Modal.Body>
          <Modal.Footer style={{ justifyContent: "space-between" }}>
            <Button
              variant="primary"
              // eslint-disable-next-line
              onClick={() => (handleClose(), setQr(""))}
              style={{
                backgroundColor: "white",
                border: "none",
                fontSize: "40px",
              }}
            >
              <RiArrowGoBackLine color="green" />
            </Button>
            <Button
              onClick={handleClose}
              href={qr}
              download="qrcode.png"
              variant="secondary"
              style={{
                backgroundColor: "white",
                border: "none",
                fontSize: "40px",
              }}
            >
              <BsDownload color="red" />
            </Button>
            <Button
              // eslint-disable-next-line
              onClick={() => (setModal1(true), handleClose())}
              style={{
                backgroundColor: "white",
                border: "none",
                fontSize: "40px",
              }}
            >
              <BsTrash color="red" />
            </Button>
          </Modal.Footer>
        </div>
      )}
    </Modal>
  );
}

export default Generate;
