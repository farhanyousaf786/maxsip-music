import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link, useLocation } from "react-router-dom";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/apply-online") {
      setActiveTab("apply-online");
    }
  }, [location]);

  return (
    <div className="container">
      <div className="home-card">
        <h1 className="title">Maxsip Signup</h1>
        <p className="subtitle">We All Deserve To Be Connected To The Internet🌐</p>
        <p className="subtitle">
          Free Mobile Internet Service & 4G Tablet, Phone, or SIM Card ✔️
        </p>
        <div className="home-button">
          <Link to="/apply-online">
            <p
              className={`${activeTab === "apply-online" ? "active" : ""}`}
              onClick={() => setActiveTab("apply-online")}
            >
              Sign up
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;


// Farhan //
// Farhan //
// Farhan //
// Farhan //
// Farhan //
// Farhan //
// Farhan //
// Farhan //
// Farhan //
// Farhan //
// Farhan //
// Farhan //
// Farhan //
// Farhan //
// Farhan //
// Farhan //
// Farhan //

