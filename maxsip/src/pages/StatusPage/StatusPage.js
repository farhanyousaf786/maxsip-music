import "./StatusPage.css";
import ReactLoading from "react-loading";
import React, { useEffect, useState } from "react";
import apiFunc from "../../Utils/Apis";
import xtype from "xtypejs";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import EnrollmentForm from "../../componenets/EnrollmentForm/EnrollmentForm";
import moment from "moment";
import Swal from "sweetalert2";

const StatusPage = ({ allUserData }) => {
  var obj2 = {};
  const navigate = useNavigate();
  const [editForm, setEditFrom] = useState("false");
  const [showStatus, setShowtatus] = useState("false");

  const [userObject, setObjectData] = useState({
    userObj: {},
  });

  const [details, setState] = useState({
    email: "",
    fName: "",
    lName: "",
    mName: "",
    dob: "",
    ssn: "",
    zipCode: "",
    areaState: "",
    city: "",
    address: "",
    phoneNumber: "",
  });

  const handleClick = () => setEditFrom("true");

  const myStatus = async (e) => {
    let timerInterval;
    Swal.fire({
      title: "Getting Data..",
      html: "<b></b> lines to scan",
      timer: 2222,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });

    console.log(allUserData.res.data[0]["enroll_id"]);
    console.log(allUserData.res.data[0]["email"]);
    console.log(xtype.type(allUserData.res.data[0]["other_fields"]));
    // console.log(allUserData.res.data[0]["other_fields"]);
    const obj = JSON.parse(allUserData.res.data[0]["other_fields"]);
    obj2 = JSON.parse(allUserData.res.data[0]["other_fields"]);
    console.log(`Zip code: ${obj["zip_code"]}`);
    console.log(`enrollment_id code: ${obj["enrollment_id"]}`);
    console.log(`first_name code: ${obj["first_name"]}`);
    console.log(`middle_name code: ${obj["middle_name"]}`);
    console.log(`last_name code: ${obj["last_name"]}`);
    console.log(`ssn code: ${obj["ssn"].slice(-4)}`);
    console.log(`Zip month: ${obj["month"]}`);
    console.log(`day code: ${obj["day"]}`);
    console.log(`year code: ${obj["year"]}`);
    console.log(`email code: ${obj["email"]}`);
    console.log(`phone_number code: ${obj["phone_number"]}`);
    console.log(`address_city code: ${obj["address_city"]}`);
    console.log(`address_state code: ${obj["address_state"]}`);
    console.log(`plan_id code: ${obj["plan_id"]}`);

    setObjectData({
      ...userObject,
      userObj: obj,
    });

    setState({
      ...details,
      email: obj["email"],
      fName: obj["first_name"],
      lName: obj["last_name"],
      mName: obj["middle_name"],
      dob: obj["year"] + "-" + obj["month"] + "-" + obj["day"],
      ssn: obj["ssn"].slice(-4),
      zipCode: obj["zip_code"],
      areaState: obj["address_state"],
      city: obj["address_city"],
      address: obj["address_one"],
      phoneNumber: obj["phone_number"],
    });

    const response = await apiFunc.authFunction();
    if (response.status === 200) {
      console.log("Response 1 from Api:> ", response.data);

      await verifyACP(response.data);
    }

    if (details.address == "") {
      console.log(
        `empty >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`,
        userObject.userObj
      );
    } else {
      console.log(
        `good >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`,
        userObject.userObj
      );
    }
    // setTimeout(function () {}, 400);

    // async function verifyACP(token) {
    //     console.log(`plan_id code: ${details.email}`);
    //     console.log(`plan_id code: ${details.fName}`);
    //     console.log(`plan_id code: ${details.lName}`);
    //     console.log(`plan_id code: ${details.mName}`);
    //     console.log(`plan_id code: ${details.dob}`);
    //     console.log(`plan_id code: ${details.ssn}`);
    //     console.log(`plan_id code: ${details.zipCode}`);
    //     console.log(`plan_id code: ${details.areaState}`);
    //     console.log(`plan_id code: ${details.city}`);
    //     console.log(`plan_id code: ${details.address}`);
    //     console.log(`plan_id code: ${details.phoneNumber}`);

    //   const response = await apiFunc.verifyACP(
    //     token,
    //     details,
    //     obj["enrollment_id"],
    //     obj["plan_id"]
    //   );
    //   if (response.status === 200) {
    //     console.log("Response 11 from Api:> ", response.data);

    //     if (JSON.stringify(response.data).includes("The subscriber has not")) {
    //       swal(
    //         "The subscriber needs to verify via National Verifer Services",

    //       );
    //     } else {
    //       swal("Sorry!", "An Error Occure", "error");
    //     }
    //   }
    // }
  };

  async function verifyACP(token) {
    console.log(`plan_id code: ${details.email}`);
    console.log(`plan_id code: ${details.fName}`);
    console.log(`plan_id code: ${details.lName}`);
    console.log(`plan_id code: ${details.mName}`);
    console.log(`plan_id code: ${details.dob}`);
    console.log(`plan_id code: ${details.ssn}`);
    console.log(`plan_id code: ${details.zipCode}`);
    console.log(`plan_id code: ${details.areaState}`);
    console.log(`plan_id code: ${details.city}`);
    console.log(`plan_id code: ${details.address}`);
    console.log(`plan_id code: ${details.phoneNumber}`);

    const response = await apiFunc.verifyACP(
      token,
      details,
      obj2["enrollment_id"],
      obj2["plan_id"]
    );
    if (response.status === 200) {
      console.log("Response 11 from Api:> ", response.data);

      if (JSON.stringify(response.data).includes("The subscriber has not")) {
        Swal.fire({
          title: "Alert",
          text: "The subscriber needs to verify via National Verifer Services",
          icon: "warning",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
        });
      } else {
        // swal("Sorry!", "An Error Occure", "error");
      }
    }

    setShowtatus("true");
  }

  const handleChange = (e) => {
    console.log("e.target.name =:> ", e.target.name);
    console.log("e.target.value =:> ", e.target.value);

    var value;
    var name;
    console.log("entry:>>>>>>>>", e.target.name);
    if (e.target.name === "dob") {
      name = e.target.name;
      value = moment(e.target.value).format("YYYY-MM-DD");
      console.log("date>>>>>>>> ", value);
      setState((prev) => {
        return { ...prev, [name]: value };
      });
    } else {
      name = e.target.name;
      value = e.target.value;
      console.log("other>>>>>>>> ", value);

      setState((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      details.fName == "" ||
      details.lName == "" ||
      details.mName == "" ||
      details.email == "" ||
      details.dob == "" ||
      details.ssn == "" ||
      details.zipCode == "" ||
      details.areaState == "" ||
      details.city == "" ||
      details.phoneNumber == ""
    ) {
    } else {
      console.log(`enrollment_id code: ${userObject.userObj["enrollment_id"]}`);
      console.log(`enrollment_id code: ${userObject.userObj["plan_id"]}`);

      const response = await apiFunc.authFunction();
      if (response.status === 200) {
        console.log("Response 1 from Api:> ", response.data);
        await updateEnrollmentDetails(response.data);
      }

      async function updateEnrollmentDetails(token) {
        const response = await apiFunc.updateEnrollmentDetails(
          token,
          details,
          userObject.userObj["enrollment_id"],
          userObject.userObj["plan_id"]
        );

        if (response.status === 200) {
          console.log("Response 6 from Api:> ", response.data);
        }
      }
    }
  };
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  return (
    <div>
      {editForm == "true" ? (
        <EnrollmentForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          details={details}
          from={"statusPage"}
        />
      ) : showStatus == "false" ? (
        <div id="title" className="slide header">
          <div align="center">
            <div class="card">
              <h1 className="caption-status">Reocrd Found</h1>

              <h1 className="caption2-status">
                Click to check Details of your application
              </h1>

              <div class="cardText">
                <button class="button status" onClick={myStatus}>
                  {showStatus == "false" ? "Get Details" : "Reocrd Found"}
                </button>
              </div>
            </div>
          </div>
          <div className="bottom-caption-status">
            The Emergency Broadband Benefit is an FCC program to help families
            and households struggling to afford internet service. This new
            benefit will connect eligible households to jobs, critical
            healthcare services, virtual classrooms, and so much more online.
          </div>
        </div>
      ) : (
        <div id="title" className="slide header">
          <div align="center">
            <div class="card">
              <div class="cardText">
                <table>
                  <caption>Current Status</caption>
                  {/* <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Values</th>
                    </tr>
                  </thead> */}
                  <tbody>
                    <tr>
                      <td data-label="Account">Email</td>
                      <td data-label="Due Date">{details.email}</td>
                    </tr>
                    <tr>
                      <td scope="row" data-label="Account">
                        First Name
                      </td>
                      <td data-label="Due Date">{details.fName}</td>
                    </tr>
                    <tr>
                      <td scope="row" data-label="Account">
                        Last Name
                      </td>
                      <td data-label="Due Date">{details.lName}</td>
                    </tr>
                    <tr>
                      <td scope="row" data-label="Acount">
                        Zip
                      </td>
                      <td data-label="Due Date">{details.zipCode}</td>
                    </tr>
                    <tr>
                      <td scope="row" data-label="Acount">
                        Last 4 Snn
                      </td>
                      <td data-label="Due Date">{details.ssn}</td>
                    </tr>
                  </tbody>
                </table>
                <button onClick={handleClick} class="button edit">
                  Edit Form
                </button>
                <button class="button status" onClick={myStatus}>
                  {showStatus == "false" ? "Get Details" : "Check Status"}
                </button>
                <div className="bottom-caption-status">
                  The Emergency Broadband Benefit is an FCC program to help
                  families and households struggling to afford internet service.
                  This new benefit will connect eligible households to jobs,
                  critical healthcare services, virtual classrooms, and so much
                  more online.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusPage;

//types:

// blank
// balls
// bars
// bubbles
// cubes
// cylon
// spin
// spinningBubbles
// spokes
