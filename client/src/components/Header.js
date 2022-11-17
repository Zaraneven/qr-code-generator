import React, { useState } from "react";
import logoqr from "../assets/images/logoqr.png";
import Button from "react-bootstrap/Button";
import Generate from "./Generate";

function Header({ inputHandler, checkShow, setModal1 }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  return (
    <div className="app-header" style={{ marginTop: "0px" }}>
      <div className="app">
        <img
          style={{ width: "250px", height: "80px", float: "left" }}
          src={logoqr}
          alt="logo"
        />
      </div>
      <input onChange={inputHandler} label="search" />
      <Button variant="secondary" onClick={handleShow}>
        Generate
      </Button>
      <Button
        onClick={checkShow}
        style={{ marginLeft: "10px" }}
        variant="secondary"
      >
        Show
      </Button>
      <Generate
        handleShow={handleShow}
        show={show}
        setShow={setShow}
        setModal1={setModal1}
      />
    </div>
  );
}

export default Header;
