import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const View = () => {
  const [user, setUser] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleuser(id);
    }
  }, [id]);

  const getSingleuser = async (id) => {
    const response = await axios.get(`http://localhost:5000/user/${id}`);

    if (response.status === 200) {
      setUser({ ...response.data[0] });
    }
  };

  return (
    <div>
      <h2>{user && user.name}</h2>
    </div>
  );
};

export default View;
