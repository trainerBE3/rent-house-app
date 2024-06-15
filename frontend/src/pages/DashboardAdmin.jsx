import React from "react";
import { Container, Row, Col, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaUser, FaHome, FaBuilding, FaClipboardList, FaMoneyBill, FaSignOutAlt } from "react-icons/fa";
import "../dist/dashboardadmin.css";

const DashboardAdmin = () => {
  const userName = "Nama User"; // Replace with dynamic user name

  return (
    <div className="wrapper">
      <Navbar bg="var(--third-color)" expand="lg" sticky="top">
        <Container fluid>
          <Navbar.Brand>
            <img src="/logo-brands.png" alt="Brand Logo" className="navbar-logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <NavDropdown title={<FaUser />} id="basic-nav-dropdown">
                {/* <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                <NavDropdown.Divider /> */}
                <NavDropdown.Item href="/logout" className="text-danger">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
              <Navbar.Text className="ms-2 text-white">{userName}</Navbar.Text>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid>
        <Row>
          <Col md={2} className="sidebar position-fixed">
            <div className="sidebar-sticky">
              <Nav className="flex-column">
                <Nav.Link href="/dashboard" className="d-flex align-items-center">
                  <FaHome className="me-2" />
                  Dashboard
                </Nav.Link>
                <Nav.Link href="/properties" className="d-flex align-items-center">
                  <FaBuilding className="me-2" />
                  Properties
                </Nav.Link>
                <Nav.Link href="/bookings" className="d-flex align-items-center">
                  <FaClipboardList className="me-2" />
                  Booking
                </Nav.Link>
                <Nav.Link href="/transactions" className="d-flex align-items-center">
                  <FaMoneyBill className="me-2" />
                  Transaksi
                </Nav.Link>
                <Nav.Link href="/logout" className="mt-auto d-flex align-items-center text-danger">
                  <FaSignOutAlt className="me-2" />
                  Logout
                </Nav.Link>
              </Nav>
            </div>
          </Col>
          <Col className="main-content">            
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa expedita repellat repellendus, dolor
              deleniti sint suscipit totam consequuntur. Quaerat excepturi deserunt libero rem ipsa aspernatur
              ducimus in? Omnis, laboriosam eligendi!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa expedita repellat repellendus, dolor
              deleniti sint suscipit totam consequuntur. Quaerat excepturi deserunt libero rem ipsa aspernatur
              ducimus in? Omnis, laboriosam eligendi!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa expedita repellat repellendus, dolor
              deleniti sint suscipit totam consequuntur. Quaerat excepturi deserunt libero rem ipsa aspernatur
              ducimus in? Omnis, laboriosam eligendi!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa expedita repellat repellendus, dolor
              deleniti sint suscipit totam consequuntur. Quaerat excepturi deserunt libero rem ipsa aspernatur
              ducimus in? Omnis, laboriosam eligendi!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa expedita repellat repellendus, dolor
              deleniti sint suscipit totam consequuntur. Quaerat excepturi deserunt libero rem ipsa aspernatur
              ducimus in? Omnis, laboriosam eligendi!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa expedita repellat repellendus, dolor
              deleniti sint suscipit totam consequuntur. Quaerat excepturi deserunt libero rem ipsa aspernatur
              ducimus in? Omnis, laboriosam eligendi!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa expedita repellat repellendus, dolor
              deleniti sint suscipit totam consequuntur. Quaerat excepturi deserunt libero rem ipsa aspernatur
              ducimus in? Omnis, laboriosam eligendi!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa expedita repellat repellendus, dolor
              deleniti sint suscipit totam consequuntur. Quaerat excepturi deserunt libero rem ipsa aspernatur
              ducimus in? Omnis, laboriosam eligendi!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa expedita repellat repellendus, dolor
              deleniti sint suscipit totam consequuntur. Quaerat excepturi deserunt libero rem ipsa aspernatur
              ducimus in? Omnis, laboriosam eligendi!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa expedita repellat repellendus, dolor
              deleniti sint suscipit totam consequuntur. Quaerat excepturi deserunt libero rem ipsa aspernatur
              ducimus in? Omnis, laboriosam eligendi!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa expedita repellat repellendus, dolor
              deleniti sint suscipit totam consequuntur. Quaerat excepturi deserunt libero rem ipsa aspernatur
              ducimus in? Omnis, laboriosam eligendi!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa expedita repellat repellendus, dolor
              deleniti sint suscipit totam consequuntur. Quaerat excepturi deserunt libero rem ipsa aspernatur
              ducimus in? Omnis, laboriosam eligendi!
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DashboardAdmin;

