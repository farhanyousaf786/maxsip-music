import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import EnrollmentPage from "./pages/EnrollPage/EnrollPage";
import About from "./pages/AboutUsPage/AboutUs";
import Header from "./componenets/Header.js";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<EnrollmentPage />} />
        <Route path="/about-us" element={<About />} />
      </Routes>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
