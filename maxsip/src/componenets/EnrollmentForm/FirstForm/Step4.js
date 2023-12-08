import React, { useState } from "react";
import "./Step4.css";
import swal from "sweetalert";
import jsPDF from "jspdf";
import generatePDFContent from "./generatePDFContentFile"; // Correct path to the file
import database from "./firebaseConfig";


const Step4 = () => {
  const initialLines = [
    {
      id: 1,
      text: "For my household, I affirm and understand that the Affordable Connectivity Program (ACP) is a federal government benefit program operated by the (FCC) that provides discounts on monthly broadband Internet access service and certain connected devices for eligible consumers.",
      isChecked: false,
    },
    {
      id: 2,
      text: "I am only allowed to receive one ACP monthly service discount and one ACP device discount per taxed household (not per person).",
      isChecked: false,
    },
    {
      id: 3,
      text: "I cannot transfer my ACP program benefit to another person.",
      isChecked: false,
    },
    {
      id: 4,
      text: "Eligibility for the ACP will be determined by the National Verifier, administered by the Universal Service Administrative Company (USAC).",
      isChecked: false,
    },
    {
      id: 5,
      text: "I may obtain ACP-supported broadband service from any participating provider and transfer my ACP benefit to another provider at any time.",
      isChecked: false,
    },
    {
      id: 6,
      text: "If the FCC announces the end of ACP, Maxsip Telecom will discontinue its ACP service offerings. If Maxsip Telecom determines that your household is no longer eligible to receive ACP benefits, Maxsip Telecom will notify you of that, and you may keep your service plan or switch to any other plan that Maxsip Telecom offers at that time by paying the application, plus/including applicable taxes and fees.",
      isChecked: false,
    },
    {
      id: 7,
      text: "ACP discounts can be applied to any available Maxsip Telecom service plan. Available upload/download speeds will be determined by your particular service plan, and will be dependent on other factors, including network availability, as described in our standard Terms and Conditions, including the Acceptable Use Policy.",
      isChecked: false,
    },
    {
      id: 8,
      text: "I authorize Maxsip Telecom and its contracted partners to collect, use, share and retain my personal information, including, but not limited to my full name, full residential address, date of birth, last four digits of my social security number, telephone number, eligibility criteria and status, the date on which the ACP service discount was initiated and if applicable, terminated, ACP connected device distribution date/type/make and model/status, usage status and other compliance requirements, the amount of support being sought for the service and/or device, and information necessary to establish identity and verifiable address, to USAC to ensure proper administration of the ACP service and/or connected device benefits and for the purpose of applying for, determining eligibility, enrolling in and seeking Program (ACP) service and device benefits,  Failure to provide consent will result in my being denied the ACP service and/or the connected device benefits.",
      isChecked: false,
    },
    {
      id: 9,
      text: "I agree that any state, local, tribal government, school or school district, may share information about my receipt of benefits that would establish eligibility for the ACP, and that such information will be used only to determine ACP eligibility.",
      isChecked: false,
    },
    {
      id: 10,
      text: "I give express consent for Maxsip Telecom and its contracted partners to contact me to validate my eligibility for or desire to participate in Maxsip Telecom’s ACP offers, and other products and services via email, telephone, or text messaging.",
      isChecked: false,
    },
    {
      id: 11,
      text: "I give my express consent for Maxsip Telecom and its contracted partners to install and activate software and other web applications on any tablet or other device that I have obtained from Maxsip Telecom.",
      isChecked: false,
    },
    {
      id: 12,
      text: "I understand that ACP service benefits are limited to one per taxed household. If I am found to already be receiving an ACP discount benefit from another ACP provider, I understand my current benefit will be transferred to Maxsip Telecom. I consent to the transfer of my ACP discount benefit from my current ACP provider to Maxsip Telecom.",
      isChecked: false,
    },
    {
      id: 13,
      text: "I understand that if I receive a connected device from Maxsip Telecom as part of the ACP, I will pay a co-pay amount, as defined by the regulations of the ACP.",
      isChecked: false,
    },
    {
      id: 14,
      text: "By signing below, you have read and understand the disclosures, agree with the authorizations, and consent to applying your household’s ACP benefit to Maxsip Telecom’s services.",
      isChecked: false,
    },
  ];
  const [lines, setLines] = useState(initialLines);
  const [fullName, setFullName] = useState("");

  const handleLineChange = (id) => {
    setLines((prevLines) =>
      prevLines.map((line) =>
        line.id === id ? { ...line, isChecked: !line.isChecked } : line
      )
    );
  };

  const handleFullNameChange = (event) => {
    const { value } = event.target;
    setFullName(value);
  };

  const handleSubmit = () => {
    // Check if all boxes are checked
    const allBoxesChecked = lines.every((line) => line.isChecked);

    // Check if full name is entered
    const fullNameEntered = fullName.trim() !== "";

    if (allBoxesChecked && fullNameEntered) {
      // Generate the PDF content
      const pdfContent = generatePDFContent(lines, fullName);

      // Create a new PDF document
      const doc = new jsPDF();
      doc.setFontSize(12);

      // Add the PDF content to the document
      doc.text(pdfContent, 10, 10);
      //       doc.save("consent-form.pdf");

      // Save the PDF to Firebase Storage
      const pdfBlob = doc.output("blob");
      database
        .ref("user")
        .set({
          url: "ccc",
          age: "atghhyffffhtyge",
        })
        .catch(alert);
    } else {
      swal("Alert", "Check All box & Sign", "warning");
    }
  };

  const handleCheckAllChange = (event) => {
    const { checked } = event.target;
    setLines((prevLines) =>
      prevLines.map((line) => ({ ...line, isChecked: checked }))
    );
  };

  return (
    <div>
      <div className="step4-container">
        <h2>Read and Sign Consent Form</h2>
        <div className="lines-container">
          <div className="line check-all-line">
            <input
              className="checkbox-container"
              type="checkbox"
              checked={lines.every((line) => line.isChecked)}
              onChange={handleCheckAllChange}
            />
            <span>
              <b>Click here to check all boxes</b>{" "}
              <span className="gray-text">(I read all form)</span>
            </span>
          </div>
          {lines.map((line) => (
            <div
              className="line"
              key={line.id}
              onClick={() => handleLineChange(line.id)}
            >
              <input
                className="checkbox-container"
                type="checkbox"
                name={`isChecked${line.id}`}
                checked={line.isChecked}
                onChange={() => {}} // This is to prevent the checkbox from being triggered by clicking on the line
              />
              <span>{line.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="signature-container">
        <p className="signature-line">
          I understand this is a digital signature and is the same as I sign my
          name with a pen.
        </p>
        <div className="full-name-container">
          <label htmlFor="fullName"></label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={fullName}
            onChange={handleFullNameChange}
            placeholder="Enter your full name"
          />
        </div>
      </div>
      <div className="submit-container">
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Step4;
