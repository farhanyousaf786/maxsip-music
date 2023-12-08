import React from "react";
import "./EnrollmentForm.css";
import { useMediaQuery } from "react-responsive";
import { Row, Col } from "react-bootstrap";
import FormFields from "./FormFields";

const EnrollmentForm = ({
  handleChange,
  handleSubmit,
  details,
  form
}) => {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <div id="title" className="slide header">
      <form className="enrollment-form" id="contact" onSubmit={handleSubmit}>
        <h3 className="top-text">Maxsip Enrollment</h3>

        {isDesktopOrLaptop && (
          <div class="grid-container">
            <FormFields handleChange={handleChange} details={details} />
          </div>
        )}

        {isTabletOrMobile && (
          <div>
            <FormFields handleChange={handleChange} details={details} />
          </div>
        )}

        <input id="submit-button" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default EnrollmentForm;
