import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col } from "react-bootstrap";
import NavbarAndSidebar from "../components/AdminPageComponent/NavbarAndSidebar";
import "../dist/adminproperties.css";

const DashboardAdmin = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserData(user);
    }
  }, []);

  useEffect(() => {
    if (userData.id) {
      fetchUserData(userData.id);
    }
  }, [userData.id]);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`/api/users/detail/${userId}`);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className="wrapper">
      <NavbarAndSidebar />
      <Col className="main-content">
        <div>
          <p>Halo</p>
        </div>
      </Col>
    </div>
  );
};

export default DashboardAdmin;
