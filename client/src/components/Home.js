import React, { useState, useEffect } from "react";
import { listQrcodes } from "../api/qcode";
import Show from "./Show";
import Header from "./Header";
import googlemap from "../assets/images/googlemap.png";
import qrcod from "../assets/images/qrcod.webp";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";


const Home = () => {
  const [qrco, setQrco] = useState([]);
  const [inputText, setInputText] = useState("");
  const [card, setCard] = useState(false);
  const [check, setCheck] = useState(false);
  

  useEffect(() => {
    listQrcodes().then((data) => {
      setQrco(data);
    });
  }, [qrco]);

 

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const filteredData = qrco.filter((el) => {
    if (inputText === "") {
      return el;
    } else {
      return el.title.toLowerCase().includes(inputText);
    }
  });

  const checkShow = () => {
    if (filteredData.length > 0) {
      setCard(true);
    } else if (filteredData <= 0) {
      setCheck(true);
    }
  };

  return (
    <div>
      <Header
        inputHandler={inputHandler}
        setCard={setCard}
        checkShow={checkShow}
        
      />
      <div className="home">
        {!card && !inputText && (
          <div >
            <img
            className="imgGenerateHom"
              src={qrcod}
              alt="logo"
              style={{ float: "left", marginLeft: "100px" }}
            />
            <img
            className="imgGenerateHom"
              src={googlemap}
              alt="logo"
              style={{ float: "right", width: "500px", marginRight: "100px" }}
            />
          </div>
        )}
        {(card || inputText) && (
          <div className="gridd">
            {filteredData.map((qr) => (
              <div>
                <Show qrcode={qr} key={qrco._id} />
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal show={check} >
        <Modal.Body>
          <h2>You don't have any QR Codes !!!</h2>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setCheck(false)} >
            Close
            </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
