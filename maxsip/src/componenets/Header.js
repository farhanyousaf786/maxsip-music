import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import logoImage from '../assets/logo.png'; // Replace 'logo.png' with your image file


const Header = () => {

  return (

    <div>
      <div class="header">
      <a href="#default" className="logo">
    <img  style={{
        height: 50,
        width: 150,
    }} src={logoImage} alt="Song Redemption" />
  </a>
        <div class="header-right">
          <Link to={"/"} class="about-button">
            Home
          </Link>
          <Link to={"/about-us"} class="about-button">
            About Us
          </Link>
          <Link to={"/faq"} class="about-button">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
