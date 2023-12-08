// StepTabs.js

import React from "react";
import "./StepTabs.css";

const StepTabs = ({
  handleStep1,
  handleStep2,
  handleStep3,
  handleStep4,
  currentStep,
}) => {
  return (
    <div className="step-tabs">
      <div className="step-tabs-container">
        <button
          className={currentStep === 1 ? "active" : ""}
          onClick={handleStep1}
        >
          Personal Information
        </button>
        <button
          className={currentStep === 2 ? "active" : ""}
          onClick={handleStep2}
        >
          Address and Shipping Info
        </button>

        <button
          className={currentStep === 4 ? "active" : ""}
          onClick={handleStep4}
        >
          Consent Form
        </button>
        <button
          className={currentStep === 3 ? "active" : ""}
          onClick={handleStep3}
        >
          Summary
        </button>
      </div>
    </div>
  );
};

export default StepTabs;
