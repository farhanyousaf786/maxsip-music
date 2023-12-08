import React, { useState, useEffect } from "react";
import "./Step3.css";
import axios from "axios";
import swal from "sweetalert";

const Step3 = ({ formData, handlePreviousStep }) => {
  const [loading, setLoading] = useState(false);
  const [showNVButton, setShowNVButton] = useState(false);
  const [errors, setErrors] = useState("");
  const [NVUrl, setNVUrl] = useState("");

  const {
    firstName,
    lastName,
    middleInitial,
    dob,
    ssn,
    houseNumber,
    street,
    city,
    state,
    zip,
    apartmentNumber,
    email,
    primaryPhone,
    assistanceType,
    address,
  } = formData;

  const handleSubmit = async () => {
    setLoading(true);
    setErrors(""); // Initialize errors as an empty array
    console.log("address > " + address);
    console.log("email > " + email);
    console.log("Fname> " + firstName);
    console.log("Lname> " + lastName);
    console.log("House number> " + houseNumber);
    console.log("street > " + street);
    console.log("city > " + city);
    console.log("state > " + state);
    console.log("zip > " + zip);

    const response = await axios.post("/createCustomer", {
      email: email,
      firstName: firstName,
      lastName: lastName,
      middleInitial: middleInitial,
      dob: dob,
      ssn: ssn,
      phone: primaryPhone,
      houseNumber: houseNumber,
      street: street,
      city: city,
      state: state,
      zip: zip,
      authorEmail: "mrubenstein49@gmail.com",
      typeId: assistanceType,
      // Replace with your plan ID
      callbackUrl: window.location.href, // Add this line to include the current URL as the callback URL
    });

    // if (response.data.NladResponse?.NV_Url) {
    const status = response.data.Status;
    console.log(response.data); // Assuming response.data contains the API response
    if (status === "Success") {
      console.log("a Response:> " + JSON.stringify(response.data));
      console.log("1 :> " + JSON.stringify(response.data.NladResponse.NV_Url));
      console.log("2 :> " + JSON.stringify(response.data.Status));
      console.log("3 :> " + JSON.stringify(response.data.StatusText));
      setNVUrl(response.data.NladResponse.NV_Url);
      setShowNVButton(true);
      setLoading(false);
      swal(
        "Alert",
        "Successfully Created, Click Verify NLAD button",
        "success"
      );
    } else {
      console.log("b Response:> " + JSON.stringify(response.data));
      console.log("1 :> " + JSON.stringify(response.data));
      console.log("2 :> " + JSON.stringify(response.data.Status));
      console.log("3 :> " + JSON.stringify(response.data.StatusText));
      const statusText = response.data.StatusText;
      if (statusText.includes("already ")) {
        setErrors(
          "Account is already created against this First name, Last name, Date of birth and SNN."
        ); // Set errors as an array from the API response

        swal("Alert", "Account Already Created", "warning");
      } else if (statusText.includes("No packages match this order")) {
        swal(
          "Alert",
          "Information you gave in incorrect, please recheck it.",
          "warning"
        );
        setErrors("Information you gave in incorrect, please recheck it."); // Set errors as an array from the API response
      } else {
        swal("Alert", "Something went wrong, Connect Support", "warning");
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    const handleNladCallback = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const callbackParam = urlParams.get(
        "https://nvca.universalservice.org/ebca-ui/#/pending-review"
      );
      if (callbackParam === "pending-review") {
        console.log("redirected done");
        // NLAD form has been completed, you can redirect to the desired page (e.g., Step4)
        // Replace "/step4" with the URL of your Step4 component or the desired page
        window.location.href = "/step4";
      }
    };

    // Add an event listener to handle the callback when the URL changes
    window.addEventListener("popstate", handleNladCallback);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("popstate", handleNladCallback);
    };
  }, []);
  return (
    <div className="step3-container">
      {errors == "" && NVUrl == "" && (
        <h4 className="submit-heading">
          This is the information you are submitting, click to submit
        </h4>
      )}
      {errors == "" && NVUrl == "" && (
        <table className="summary-table">
          <tbody>
            <tr>
              <td className="summary-label">First Name:</td>
              <td>{firstName || "Need to fill"}</td>
            </tr>
            <tr>
              <td className="summary-label">Last Name:</td>
              <td>{lastName || "Need to fill"}</td>
            </tr>
            <tr>
              <td className="summary-label">Middle Initial:</td>
              <td>{middleInitial || "Need to fill"}</td>
            </tr>
            <tr>
              <td className="summary-label">Date of Birth:</td>
              <td>{dob || "Need to fill"}</td>
            </tr>
            <tr>
              <td className="summary-label">SSN:</td>
              <td>{ssn || "Need to fill"}</td>
            </tr>
            <tr>
              <td className="summary-label">Address:</td>
              <td>
                {houseNumber && street && city && state && zip
                  ? `${houseNumber} ${street}, ${city}, ${state} ${zip}`
                  : "Need to fill"}
              </td>
            </tr>
            {apartmentNumber && (
              <tr>
                <td className="summary-label">Apartment #:</td>
                <td>{apartmentNumber}</td>
              </tr>
            )}
            <tr>
              <td className="summary-label">Email:</td>
              <td>{email || "Need to fill"}</td>
            </tr>
            <tr>
              <td className="summary-label">Primary Phone:</td>
              <td>{primaryPhone || "Need to fill"}</td>
            </tr>
          </tbody>
        </table>
      )}

      {errors.length > 0 && (
        <div className="error-popup">
          <center>
            <h3 className="alert-text">Alert</h3>
          </center>
          <h3 className="error-text">{errors}</h3>
        </div>
      )}

      {NVUrl != "" && (
        <div className="success-popup">
          <img
            src="https://imgur.com/4aHgmsz.png"
            alt="Success"
            className="success-image round-image "
          />
          <h3 className="congrats-text">Congrats! Nearly Done</h3>
          <center>
            <h4>Click to Continue for NLAD verify</h4>
          </center>
        </div>
      )}
      <center>
        <div className="button-container">
          <button className="button" onClick={handlePreviousStep}>
            Previous Step
          </button>
          {loading ? (
            <button className="button" onClick={handleSubmit}>
              Processing..
            </button>
          ) : (
            <>
              {showNVButton ? (
                <a
                  href={NVUrl}
                  // target="_blank"
                  rel="noopener noreferrer"
                  className={`button ${NVUrl !== "" ? "green-button" : ""}`}
                >
                  Click to verify
                </a>
              ) : (
                <button className="button" onClick={handleSubmit}>
                  Submit
                </button>
              )}
            </>
          )}
        </div>
      </center>
    </div>
  );
};

export default Step3;

// maxsip maxsip
