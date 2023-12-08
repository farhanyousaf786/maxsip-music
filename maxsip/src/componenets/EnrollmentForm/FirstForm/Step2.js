import React, { useState, useEffect } from "react";
import "./Step2.css";
import axios from "axios";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import Step3 from "./Step3";

const Step2 = ({
  formData,
  handleChange,
  handleNextStep,
  handlePreviousStep,
}) => {
  const {
    houseNumber,
    street,
    city,
    state,
    zip,
    email,
    primaryPhone,
    address,
  } = formData;

  const isFormValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex
    return (
      // address.trim() !== "" &&
      // houseNumber.trim() !== "" &&
      city.trim() !== "" &&
      state.trim() !== "" &&
      zip.trim() !== "" &&
      email.trim() !== "" &&
      primaryPhone.trim() !== "" &&
      email.match(emailRegex)
    );
  };

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  const [showStep3Modal, setShowStep3Modal] = useState(false);
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });
  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };
  const handleSelect =
    ({ description, terms }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();
      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        console.log("1>>>>> results :", results[0]);
        // Assuming results is the provided array
        if (results[0] && results[0]["address_components"]) {
          const addressComponents = results[0]["address_components"];
          // Loop through the address components and log the details
          addressComponents.forEach((component, index) => {
            if (component) {
              const { short_name, types } = component;
              console.log(
                `${index} - short_name: ${short_name}, types: ${types[0]}`
              );
              if (types[0] === "street_number") {
                handleChange({
                  target: { name: "houseNumber", value: short_name },
                });
              } else if (types[0] === "route") {
                handleChange({ target: { name: "street", value: short_name } });
              } else if (
                types[0] === "locality" ||
                types[0] === "sublocality" ||
                types[0] === "sublocality_level_1" ||
                types[0] === "political" ||
                types[0] === "neighborhood"
              ) {
                console.log(">>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<");
                handleChange({ target: { name: "city", value: short_name } });
              } else if (types[0] === "administrative_area_level_1") {
                handleChange({ target: { name: "state", value: short_name } });
              } else if (types[0] === "postal_code") {
                handleChange({ target: { name: "zip", value: short_name } });
              }
            } else {
              console.log(`Field ${index} is null or does not exist.`);
            }
          });
        } else {
          console.log("No address components found.");
        }
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  const handleAddressClick = () => {
    console.log("cliked");
  };

  return (
    <div className="container">
      {!showStep3Modal && (
        <>
          <p className="house-city-text-form">
            Enter Legal Address? &nbsp;
            <span
              style={{
                color: "#EE6649",
                fontSize: "smaller",
                fontWeight: "",
              }}
            >
              *
            </span>
          </p>
          <div className="house-street-city">
            <div className="address-input">
              <div className="group">
                <input
                  value={value === null ? address : value}
                  onChange={handleInput}
                  placeholder="Enter address"
                  onClick={handleAddressClick}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Address</label>
              </div>
              <div ref={ref}>
                {/* We can use the "status" to decide whether we should display the dropdown or not */}
                {status === "OK" && <ul>{renderSuggestions()}</ul>}
              </div>
            </div>

            <div className="city-input">
              <div className="group">
                <input
                  type="text"
                  required
                  id="city"
                  name="city"
                  value={city}
                  onChange={handleChange}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>City</label>
              </div>
            </div>

            <div className="state-input">
              <div className="group">
                <input
                  type="text"
                  required
                  id="state"
                  name="state"
                  value={state}
                  onChange={handleChange}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>State</label>
              </div>
            </div>

            <div className="zip-input">
              {" "}
              <div className="group">
                <input
                  type="text"
                  required
                  id="zip"
                  name="zip"
                  value={zip}
                  onChange={handleChange}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Zip Code</label>
              </div>
            </div>
          </div>

          <p
            style={{
              fontSize: "20px",
            }}
          >
            Email and phone number? &nbsp;
            <span
              style={{
                color: "#EE6649",
                fontSize: "smaller",
                fontWeight: "",
              }}
            >
              *
            </span>
          </p>

          <div className="email-phone">
            <div className="email-padding">
              <div class="group">
                <input
                  type="text"
                  required
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Email</label>
              </div>
            </div>

            <div class="group">
              <input
                type="text"
                required
                id="primaryPhone"
                name="primaryPhone"
                value={primaryPhone}
                onChange={handleChange}
              />
              <span class="highlight"></span>
              <span class="bar"></span>
              <label>Primary Phone</label>
            </div>
          </div>

          <center>
            {" "}
            <div className="button-container">
              <button className="button" onClick={handlePreviousStep}>
                Previous Step
              </button>
              <button
                className="button"
                onClick={() => setShowStep3Modal(true)} // Show the Step 3 modal when "Next Step" is clicked
                disabled={!isFormValid()}
              >
                Next Step
              </button>
            </div>
          </center>
        </>
      )}
      {/* Render the Step3Modal when showStep3Modal is true */}
      {showStep3Modal && (
        <Step3 formData={formData} handlePreviousStep={handlePreviousStep} />
      )}
    </div>
  );
};

export default Step2;
