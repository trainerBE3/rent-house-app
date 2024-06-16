import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  NavDropdown,
  Card,
} from "react-bootstrap";
import {
  FaHome,
  FaBuilding,
  FaClipboardList,
  FaMoneyBill,
} from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6";
import axios from "axios";
import "../dist/dashboardadmin.css";

const DashboardAdmin = () => {
  const location = useLocation(); // Get current pathname
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    let valUser = 0;
    if (localStorage.getItem("user")) {
      valUser = JSON.parse(localStorage.getItem("user"));
    }
    const userId = valUser.id;
    if (userId) {
      fetchUserData(userId);
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`/api/users/detail/${userId}`);
      const user = response.data;
      setUserData(user);
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

  const [count, setCount] = useState({
    usersCount: 0,
    propertiesCount: 0,
    bookingsCount: 0,
    transactionsCount: 0,
    totalProfit: 0,
  });

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await axios.get('/api/dashboard/total', {
          headers: {            
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setCount(response.data);
      } catch (error) {
        console.error('Error fetching count:', error);
      }
    };

    fetchCount();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="wrapper">
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
                  active={location.pathname === '/admin/properties'}
                >
                  <FaBuilding className="me-2" />
                  Properties
                </Nav.Link>
                <Nav.Link
                  id="sidebarmenu"
                  href="/bookings"
                  className="d-flex align-items-center"
                >
                  <FaClipboardList className="me-2" />
                  Booking
                </Nav.Link>
                <Nav.Link
                  id="sidebarmenu"
                  href="/transactions"
                  className="d-flex align-items-center"
                >
                  <FaMoneyBill className="me-2" />
                  Transaksi
                </Nav.Link>
              </Nav>
            </div>
          </Col>
          <Col className="main-content">
            <div className="d-flex justify-content-center">
              <Card>
                <Card.Header as="h3" className="text-center" style={{background: "#1d2636", color: "white"}}>Property</Card.Header>
                <Card.Body className="d-flex align-items-center justify-content-center">
                  <FaBuilding size={50} className="me-3" />
                  <span style={{ fontSize: "50px" }}>{count.propertiesCount}</span>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header as="h3" className="text-center" style={{background: "#1d2636", color: "white"}}>Booking</Card.Header>
                <Card.Body className="d-flex align-items-center justify-content-center">
                  <FaClipboardList size={50} className="me-3" />
                  <span style={{ fontSize: "50px" }}>{count.bookingsCount}</span>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header as="h3" className="text-center" style={{background: "#1d2636", color: "white"}}>Transaksi</Card.Header>
                <Card.Body className="d-flex align-items-center justify-content-center">
                  <FaMoneyBill size={50} className="me-3" />
                  <span style={{ fontSize: "50px" }}>{count.transactionsCount}</span>
                </Card.Body>
              </Card>
            </div>
            <div className="card-profit">
              <Card style={{width: '50rem'}}>
                <Card.Header as="h3" className="text-center" style={{background: "#1d2636", color: "white"}}>Profit</Card.Header>
                <Card.Body className="d-flex align-items-center justify-content-center">
                <FaHandHoldingDollar size={50} className="me-3" />                  
                  <span style={{ fontSize: "20px" }}>{formatPrice(count.totalProfit)}</span>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DashboardAdmin;
