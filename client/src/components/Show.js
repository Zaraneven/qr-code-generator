import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BsTrash } from "react-icons/bs";
import qrimg from "../assets/images/qrimg.png";
import { GrMapLocation } from "react-icons/gr";
import Modal from "react-bootstrap/Modal";
import  QRCode  from "qrcode";
import { BsDownload } from "react-icons/bs";
import {RiArrowGoBackLine} from 'react-icons/ri'
import ModalDelete from "./ModalDelete";

const Show = ({ qrcode }) => {
  
  const [open, setOpen] = useState(false)
  const [modal1, setModal1] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleCloseModal = () => setOpen(false)
  const [qr, setQr] = useState("");

  const generateQRCode = () => {
    handleOpen();
    QRCode.toDataURL(
      qrcode.url,
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
  };
  
 
/*  const deletQr = () => {
    removeQrcode(qrcode._id);
    setShow(false)
    setOpen(false)
  }; */

  return (
    <div  style={{ width: "12rem", margin: '5px' }}>
      <Card className="card" >
        <Card.Body>
          <Card.Title>{qrcode.title}</Card.Title>
          <Card.Img
            variant="top"
            src={qrimg}
            style={{ height: "100px", width: "100px" }}
          />
          <button onClick={generateQRCode}
            style={{
              backgroundColor: "white",
              border: "none",
              float: "left",
              fontSize: "25px",
            }}
            
          >
            <GrMapLocation />
          </button>
          <button
            onClick={() => setModal1(true)}
            style={{
              backgroundColor: "white",
              border: "none",
              float: "right",
              fontSize: "25px",
            }}
          >
            <BsTrash color="red" />
          </button>
        </Card.Body>
      </Card>
      
    <Modal show={open} onHide={handleCloseModal} closeButton>
    <Modal.Header >
      <Modal.Title>Scan the QR Code to access our location! Open the location in mobile browser.</Modal.Title>
    </Modal.Header>
    <Modal.Body >
      <h2>{qrcode.title}</h2>
        <img alt='qrcode' src={qr} style={{height: '250px', width: '300px'}}/>
    </Modal.Body>
    <Modal.Footer style={{justifyContent: 'space-between'}}>
      <button onClick={handleCloseModal} style={{ backgroundColor: 'white', border: 'none', fontSize: '40px'}}>
        <RiArrowGoBackLine color='green' />
      </button >
      <Button href={qr}  download="paragon-qr-code.png" variant="secondary" style={{backgroundColor: 'white', border: 'none', fontSize: '40px'}}>
        < BsDownload color='red' />
      </Button>
      <Button variant="primary" onClick={() => setModal1(true)} style={{float: 'right', backgroundColor: 'white', border: 'none', fontSize: '40px'}}>
        <BsTrash color="red" />
      </Button>
    </Modal.Footer>
    </Modal>
    <ModalDelete setModal1={setModal1} title={qrcode.title} modal1={modal1} del={qrcode._id} handleCloseModal={handleCloseModal}/>
    </div>
  );
};


export default Show;
