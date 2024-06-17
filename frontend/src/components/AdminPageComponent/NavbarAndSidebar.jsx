import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  NavDropdown,  
} from "react-bootstrap";
import {
  FaHome,
  FaBuilding,
  FaClipboardList,
  FaMoneyBill,  
  FaUser,
} from "react-icons/fa";
import axios from "axios";
import "./NavbarAndSidebar.css";

const NavbarAndSidebar = () => {
  const location = useLocation();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      await axios.put(`/api/users/logout/${userData._id}`);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }; 

  return (
    <>
      <Navbar bg="var(--third-color)" expand="lg" sticky="top">
        <Container fluid>
          <Navbar.Brand>
            <img
              src="/logo-brands.png"
              alt="Brand Logo"
              className="navbar-logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <NavDropdown title={userData.fullname} id="basic-nav-dropdown">
                <NavDropdown.Item
                  onClick={handleLogout}
                  className="text-danger"
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid>
        <Row>
          <Col md={2} className="sidebar position-fixed">
            <div className="sidebar-sticky">
              <Nav variant="pills" defaultActiveKey="/admin/dashboard" className="flex-column">
                <Nav.Link
                  id="sidebarmenu"
                  href="/admin/dashboard"
                  className="d-flex align-items-center"
                  active={location.pathname === '/admin/dashboard'}
                >
                  <FaHome className="me-2" />
                  Dashboard
                </Nav.Link>
                <Nav.Link
                  id="sidebarmenu"
                  href="/admin/properties"
                  className="d-flex align-items-center"
                  active={location.pathname.startsWith('/admin/properties')}
                >
                  <FaBuilding className="me-2" />
                  Property
                </Nav.Link>
                <Nav.Link
                  id="sidebarmenu"
                  href="/admin/bookings"
                  className="d-flex align-items-center"
                  active={location.pathname.startsWith('/admin/bookings')}
                >
                  <FaClipboardList className="me-2" />
                  Booking
                </Nav.Link>
                <Nav.Link
                  id="sidebarmenu"
                  href="/admin/transactions"
                  className="d-flex align-items-center"
                  active={location.pathname.startsWith('/admin/transactions')}
                >
                  <FaMoneyBill className="me-2" />
                  Transaksi
                </Nav.Link>
                {userData.role === 3 && (
                  <Nav.Link
                    id="sidebarmenu"
                    href="/users"
                    className="d-flex align-items-center"
                  >
                    <FaUser className="me-2" />
                    Users
                  </Nav.Link>
                )}
              </Nav>
            </div>
          </Col>          
        </Row>
      </Container>
    </>
  );
};

export default NavbarAndSidebar;