import React, { useState } from "react";
import "./Step1.css";

const Step1 = ({ formData, handleChange, handleNextStep }) => {
  const { firstName, lastName, middleInitial, dob, ssn, assistanceType } =
    formData;

  const dropdownOptions = [
    "Medical assistance (Medicaid)",
    "Supplemental security income (SSI)",
    "Tribally-Administered Temporary Assistance for Needy Families (TTANF)",
    "Tribal - Head start (Income qualifying Only)",
    "Food Distribution Program on Indian Reservations (FDPIR)",
    "Tribal - Bureau of Indian Affairs General Assistance",
    "Program Eligibility Approved by State Administrator",
    "Veteran’s pension",
    "School Lunch/Breakfast Program",
    "Federal Pell Grant",
    "Substantial Loss of Income",
    "Existing low income program/COVID19 program",
    "Federal public housing",
    "Food stamps",
  ];

  // State to manage the selected dropdown option
  const [selectedOption, setSelectedOption] = useState(assistanceType);

  const assistanceTypeToValue = {
    [dropdownOptions[0]]: "100004",
    [dropdownOptions[1]]: "100006",
    [dropdownOptions[2]]: "100008",
    [dropdownOptions[3]]: "100009",
    [dropdownOptions[4]]: "100010",
    [dropdownOptions[5]]: "100011",
    [dropdownOptions[6]]: "100001",
    [dropdownOptions[7]]: "100002",
    [dropdownOptions[8]]: "100014",
    [dropdownOptions[9]]: "110000",
    [dropdownOptions[10]]: "110001",
    [dropdownOptions[11]]: "110002",
    [dropdownOptions[12]]: "110003",
  };

  const handleDropdownChange = (event) => {
    const selectedOption = event.target.value;
    const selectedValue = assistanceTypeToValue[selectedOption];
    setSelectedOption(selectedOption); // Update the selected option state
    handleChange({
      target: {
        name: "assistanceType",
        value: selectedValue,
      },
    });
  };

  const isFormValid = () => {
    const ssnRegex = /^\d{4}$/; // 4 digits numeric
    const middleInitialRegex = /^[A-Za-z]$/; // 1 character alphabetic
    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      middleInitial.trim() !== "" &&
      middleInitial.match(middleInitialRegex) &&
      dob.trim() !== "" &&
      ssn.trim() !== "" &&
      ssn.match(ssnRegex) &&
      assistanceType.trim() !== ""
    );
  };

  const progress = 30; // 20% completion

  return (
    <div>
      <div className="container">
        {/* <p
          style={{
            fontSize: "35px",
            fontWeight: "bold",
            marginBottom: "40px",
            color: "rgb(23, 2, 176)",
          }}
        >
          Maxsip Signup
        </p> */}
        {/* <div className="progress-bar">
          <div className="progress-filler" style={{ width: `${progress}%` }}>
            <div className="progress-text">30 %</div>
          </div>
        </div>
        <p
          style={{
            fontSize: "15px",
            color: "rgb(23, 2, 176)",
          }}
        >
          Step 1 of 3
        </p> */}
        <div className="assistance-type-div">
          <div className="group">
            <p className="lable-text">
              Which service would you like to apply for? &nbsp;
              <span
                style={{
                  color: "#EE6649",
                  fontSize: "smaller",
                  fontWeight: ""
                }}
              >
                *
              </span>
            </p>
            <select
              id="assistanceType"
              name="assistanceType"
              value={selectedOption}
              onChange={handleDropdownChange}
            >
              <option value="" disabled>
                Select Assistance Type
              </option>
              {dropdownOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="highlight"></span>
            <span className="bar"></span>
          </div>
          <p className="lable-text">
            What is your full leagal name? &nbsp;
            <span
                style={{
                  color: "#EE6649",
                  fontSize: "smaller",
                  fontWeight: ""
                }}
              >
                *
              </span>
          </p>
        </div>

        <div className="names-form">
          <div className="names-group">
            <div className="group">
              <input
                type="text"
                required
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={handleChange}
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>First Name</label>
            </div>
          </div>

          <div className="names-group">
            {" "}
            <div className="group">
              <input
                type="text"
                required
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={handleChange}
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Last Name</label>
            </div>
          </div>

          <div className="names-group">
            <div className="group">
              <div className="middleInitial-input">
                {" "}
                <input
                  type="text"
                  required
                  id="middleInitial"
                  name="middleInitial"
                  value={middleInitial}
                  onChange={handleChange}
                  maxLength="1"
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Middle Initial</label>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="lable-text">
            Birth day & last 4 digit SSN: &nbsp;
            <span
                style={{
                  color: "#EE6649",
                  fontSize: "smaller",
                  fontWeight: ""
                }}
              >
                *
              </span>
          </p>
        </div>
        <div className="dob-snn-group-form">
          <div className="dob-group">
            <div className="group">
              <input
                type="date"
                required
                id="dob"
                name="dob"
                value={dob}
                onChange={handleChange}
              />
              <span className="highlight"></span>
              <span className="bar"></span>
            </div>
          </div>

          <div className="ssn-group">
            <div className="group">
              <input
                type="text"
                required
                id="ssn"
                name="ssn"
                value={ssn}
                onChange={handleChange}
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>SSN (Last 4 Digit)</label>
            </div>
          </div>
        </div>
        <center>
          {" "}
          <button
            className="button"
            onClick={handleNextStep}
            disabled={!isFormValid()} // Disable the button if the form is not valid
          >
            Next Step
          </button>
        </center>
      </div>
    </div>
  );
};

export default Step1;
