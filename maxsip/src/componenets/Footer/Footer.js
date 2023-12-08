import React from "react";
import "./Footer.css";
import { useMediaQuery } from "react-responsive";

const Footer = () => {
  const largDesktop = useMediaQuery({ query: "(min-width : 1200px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1025px) and (max-width: 1280px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 765px) and (max-width: 1024px)",
  });
  const isTabletLowRes = useMediaQuery({
    query: "(min-width: 481px) and (max-width: 767px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

  return (
    <div class="footer">
      <div className="footer-icons">
        <link
          className=""
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />

        {isDesktopOrLaptop == true ||
          (largDesktop == true && (
            <div class="icon-wrapper">
              <i class="fa fa-3x fa-facebook-square"></i>
              <i class="fa fa-3x fa-twitter-square"></i>
              <i class="fa fa-3x fa-snapchat-square"></i>
            </div>
          ))}

        {isTabletLowRes && (
          <div class="icon-wrapper">
            <i class="fa fa-2x fa-facebook-square"></i>
            <i class="fa fa-2x fa-twitter-square"></i>
            <i class="fa fa-2x fa-snapchat-square"></i>
          </div>
        )}

        {isTablet && (
          <div class="icon-wrapper">
            <i class="fa fa-2x fa-facebook-square"></i>
            <i class="fa fa-2x fa-twitter-square"></i>
            <i class="fa fa-2x fa-snapchat-square"></i>
          </div>
        )}

        {isMobile && (
          <div class="icon-wrapper">
            <i class="fa fa-1x fa-facebook-square"></i>
            <i class="fa fa-1x fa-twitter-square"></i>
            <i class="fa fa-1x fa-snapchat-square"></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;
