import "./Footer.css";
import logo_drinks from "../../assets/logo_drinks.svg";
import { useState, useEffect } from "react";

function Footer() {


  return (
    <div className="footer-container">
      <div className="footer">
          <div className="logo">
            <img src={logo_drinks} />
          </div>
        </div>
    </div>
  );
}

export default Footer;
