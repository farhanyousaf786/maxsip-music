import axios from "axios";

const authFunction = async () => {
  const response = await axios.post("/authenticate", {
    vendor_id: "MaxSip",
    username: "MaxSipUser",
    password: "MaxSipbtK123hyutrw22",
    pin: "987659876522",
    agent_id: "ewebsiteapi",
    source: "WEBSITE",
  });

  return response;
};

const checkServices = async (token, details) => {
  const response = await axios.post("/enrollment", {
    token: token,
    zipCode: details.zipCode,
  });
  return response;
};

const planList = async (token, details) => {
  const response = await axios.post(
    "/plan",

    {
      token: token,
      zipCode: details.zipCode,
    }
  );
  return response;
};

const verifyCustomerDetails = async (token, details, enrollmentId) => {
  const response = await axios.post(
    "/verifyCustomerDetails",

    {
      token: token,
      email: details.email,
      pNumber: details.phoneNumber,
      eId: enrollmentId,
    }
  );
  return response;
};

const getEnrollmentDetails = async (token, details) => {
  const response = await axios.post(
    "/getEnrollmentDetails",

    {
      token: token,
      zipCode: details.zipCode,
      email: details.email,
    }
  );

  return response;
};

const updateEnrollmentDetails = async (
  token,
  details,
  enrollmentId,
  planId
) => {
  console.log("end>>>>>>>>>>>>>>>>>>>>> ", enrollmentId);

  const response = await axios.post(
    "/updateEnrollmentDetails",

    {
      token: token,
      email: details.email,
      firstName: details.fName,
      lastName: details.lName,
      min: details.mName,
      dob: details.dob,
      ssn: details.ssn,
      pPhone: details.phoneNumber,
      address: details.address,
      city: details.city,
      sState: details.areaState,
      zipCode: details.zipCode,
      eId: enrollmentId,
      pId: planId,
    }
  );
  return response;
};

const validateAddress = async (token, details, enrollmentId, planId) => {
  const response = await axios.post(
    "/validateAddress",

    {
      token: token,
      email: details.email,
      firstName: details.fName,
      lastName: details.lName,
      min: details.mName,
      dob: details.dob,
      ssn: details.ssn,
      pPhone: details.phoneNumber,
      address: details.address,
      city: details.city,
      sState: details.areaState,
      zipCode: details.zipCode,
      eId: enrollmentId,
      pId: planId,
    }
  );
  return response;
};

const programList = async (token, details) => {
  const response = await axios.post(
    "/programList",

    {
      token: token,
      zipCode: details.zipCode,
    }
  );
  return response;
};

const eligibiltyCheck = async (token, details, enrollmentId, planId) => {
  const response = await axios.post(
    "/eligibiltyCheck",

    {
      token: token,
      email: details.email,
      firstName: details.fName,
      lastName: details.lName,
      min: details.mName,
      dob: details.dob,
      ssn: details.ssn,
      pPhone: details.phoneNumber,
      address: details.address,
      city: details.city,
      sState: details.areaState,
      zipCode: details.zipCode,
      eId: enrollmentId,
      pId: planId,
    }
  );
  return response;
};

const eligibiltyStatusCheck = async (token, details, enrollmentId, planId) => {
  const response = await axios.post("/eligibiltyStatusCheck", {
    token: token,
    email: details.email,
    firstName: details.fName,
    lastName: details.lName,
    min: details.mName,
    dob: details.dob,
    ssn: details.ssn,
    pPhone: details.phoneNumber,
    address: details.address,
    city: details.city,
    sState: details.areaState,
    zipCode: details.zipCode,
    eId: enrollmentId,
    pId: planId,
  });
  return response;
};

const verifyACP = async (token, details, enrollmentId, planId) => {
  console.log("><><><><><><>< : ", enrollmentId);
  console.log("><><><><><><>< : ", planId);
  console.log("><><><><><><>< : ", details.email);
  console.log("><><><><><><>< : ", details.fName);
  console.log("><><><><><><>< : ", details.lName);
  console.log("><><><><><><>< : ", details.dob);
  console.log("><><><><><><>< : ", details.ssn);
  console.log("><><><><><><>< : ", details.phoneNumber);
  console.log("><><><><><><>< : ", details.address);
  console.log("><><><><><><>< : ", details.city);
  console.log("><><><><><><>< : ", details.areaState);
  console.log("><><><><><><>< : ", details.zipCode);

  const response = await axios.post("/verifyACP", {
    token: token,
    email: details.email,
    firstName: details.fName,
    lastName: details.lName,
    min: details.mName,
    dob: details.dob,
    ssn: details.ssn,
    pPhone: details.phoneNumber,
    address: details.address,
    city: details.city,
    sState: details.areaState,
    zipCode: details.zipCode,
    eId: enrollmentId,
    pId: planId,
  });
  return response;
};

const getPlanList = async (token, details) => {
  const response = await axios.post(
    "/getPlanList",

    {
      token: token,
      zipCode: details.zipCode,
    }
  );
  return response;
};
const createCustomer = async (token, details, enrollmentId, planId) => {
  const response = await axios.post(
    "/createCustomer",

    {
      token: token,
      email: details.email,
      firstName: details.fName,
      lastName: details.lName,
      min: details.mName,
      dob: details.dob,
      ssn: details.ssn,
      pPhone: details.phoneNumber,
      address: details.address,
      city: details.city,
      sState: details.areaState,
      zipCode: details.zipCode,
      eId: enrollmentId,
      pId: planId,
    }
  );
  return response;
};

export default {
  authFunction,
  checkServices,
  planList,
  verifyCustomerDetails,
  getEnrollmentDetails,
  updateEnrollmentDetails,
  validateAddress,
  programList,
  eligibiltyCheck,
  eligibiltyStatusCheck,
  verifyACP,
  getPlanList,
  createCustomer,
};
