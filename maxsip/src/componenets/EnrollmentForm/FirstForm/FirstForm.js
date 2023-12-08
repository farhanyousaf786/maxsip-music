import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./FirstForm.css";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import StepTabs from "../../StepTab/StepTabs";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleInitial: "",
    dob: "",
    ssn: "",
    box1: false,
    box2: false,
    houseNumber: "",
    street: "",
    zip: "",
    state: "",
    city: "",
    apartmentNumber: "",
    email: "",
    primaryPhone: "",
    assistanceType: "",
    address: "",
  
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleNextStep = () => {

    // Check if SSN and primary phone are empty
    const { ssn, primaryPhone } = formData;
    if (ssn.trim() === "" && primaryPhone.trim() === "") {

      alert(
        "Please fill in the SSN and primary phone fields before proceeding to Summary."
      );
    } else {
      console.log("<<<<<<<<<<<<<")

      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePreviousStep = () => {
    // Check if SSN and primary phone are empty
    const { ssn, primaryPhone } = formData;
    if (ssn.trim() === "" && primaryPhone.trim() === "") {

      alert(
        "Please fill in the SSN and primary phone fields before proceeding to Summary."
      );
    } else {
      console.log("<<<<<<<<<<<<<")

      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

    const handleChangeLine = (index) => {
    // Create a copy of the lines array to avoid directly modifying the state
    const updatedLines = [...formData.lines];
    // Toggle the isChecked value for the clicked line
    updatedLines[index].isChecked = !updatedLines[index].isChecked;
    // Update the formData state with the new lines array
    setFormData((prevFormData) => ({
      ...prevFormData,
      lines: updatedLines,
    }));
  };


  return (
    <div className="firstForm-container">
      <StepTabs
        handleStep1={() => setCurrentStep(1)}
        handleStep2={() => setCurrentStep(2)}
        handleStep3={() => setCurrentStep(3)}
        handleStep4={() => setCurrentStep(4)} // Add this line for Step 4

        currentStep={currentStep}
        
      />

      {currentStep === 1 && (
        <Step1
          formData={formData}
          handleChange={handleChange}
          handleNextStep={handleNextStep}
        />
      )}
      {currentStep === 2 && (
        <Step2
          formData={formData}
          handleChange={handleChange}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
        />
      )}
      {currentStep === 3 && (
        <Step3
          formData={formData}
          handleChange={handleChange}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
        />
      )}
          {currentStep === 4 && (
        <Step4
          formData={formData}
          handleChange={handleChange}
          handleChangeLine={handleChangeLine} // Pass the handleChangeLine function
          handlePreviousStep={handlePreviousStep}
        />
      )}
    </div>
  );
};

export default MultiStepForm;
