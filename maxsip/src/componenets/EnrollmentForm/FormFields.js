import React from "react";
import "./FormFields.css"

const FormFields = ({ handleChange, details }) => {
  return (
    <div class="grid-container">
      <input
        placeholder="Your Email"
        type="email"
        name="email"
        onChange={handleChange}
        value={details.email}
      />
      <input
        placeholder="First Name"
        type="text"
        name="fName"
        onChange={handleChange}
        value={details.fName}
      />

      <input
        placeholder="Last Name"
        type="text"
        name="lName"
        onChange={handleChange}
        value={details.lName}
      />

      <div>
        {" "}
        <input
          placeholder="Middle Initial Name"
          type="text"
          name="mName"
          onChange={handleChange}
          value={details.mName}
        />
      </div>
      <div>
        <input
          placeholder="Your DOB"
          type="date"
          name="dob"
          value={details.dob}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          placeholder="SSN (last 4 digit)"
          type="text"
          name="ssn"
          onChange={handleChange}
          value={details.ssn}
        />
      </div>
      <div>
        {" "}
        <input
          placeholder="Address"
          type="text"
          name="address"
          onChange={handleChange}
          value={details.address}
        />
      </div>
      <div>
        <input
          placeholder="City"
          type="text"
          name="city"
          onChange={handleChange}
          value={details.city}
        />
      </div>
      <div>
        {" "}
        <input
          placeholder="State"
          type="text"
          name="areaState"
          onChange={handleChange}
          value={details.areaState}
        />
      </div>
      <div>
        {" "}
        <input
          placeholder="Zip Code"
          type="text"
          name="zipCode"
          value={details.zipCode}
          onChange={handleChange}
        />
      </div>
      <div>
        {" "}
        <input
          placeholder="Your Phone No"
          type="tel"
          name="phoneNumber"
          onChange={handleChange}
          value={details.phoneNumber}
        />
      </div>
    </div>
  );
};

export default FormFields;
