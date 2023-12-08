// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import FirstForm from "../../componenets/EnrollmentForm/FirstForm/FirstForm";

// const LandingPage = () => {

//   return (
//         <FirstForm/>
//   );
// };

// export default LandingPage;
import React, { useState } from "react";
import axios from "axios";

const LandingPage = () => {
  const [url, setUrl] = useState("");

  const handleClick = async () => {
    const response = await axios.get("/authenticate", 
     // Add this line to include the current URL as the callback URL
    );
    console.log(response); // Assuming response.data contains the API response

  };

  return (
    <div>
      <button onClick={handleClick}>Get URL</button>
      {url && (
        <div>
          <p>Received URL:</p>
          <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
