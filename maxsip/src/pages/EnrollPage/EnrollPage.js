import React, { useState } from "react";
import axios from "axios";
import "./EnrollPage.css";


const LandingPage = () => {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const handleClick = async () => {
    try {
      console.log(email);
      console.log(username);

      const response = await axios.get(
        "/authenticate",
        {
          params: {
            email: email,
            user: username,
          },
        }
      );

      console.log(response.data.url);

      if (response.data.url) {
        window.open(response.data.url, "_blank"); // Open received URL in a new tab
      } else {
        console.log("URL not found in response");
      }
    } catch (error) {
      console.error("Error fetching URL:", error);
    }
  };


  return (
    <div className="landing-page-container">

      <div className="song-text" >Song redemption</div>
      <div className="input-container">
        <label>Email: </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label>User: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <center><button className="btn" onClick={handleClick}>
        Submit
      </button></center>
    </div>
  );
};

export default LandingPage;
