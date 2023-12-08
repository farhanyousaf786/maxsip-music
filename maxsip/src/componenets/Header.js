import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {

  return (

    <div>
      <div class="header">
        <a href="#default" class="logo">
          Maxsip Telecom
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
