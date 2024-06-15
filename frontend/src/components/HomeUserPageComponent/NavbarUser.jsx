import { Container, Nav, Navbar } from "react-bootstrap";

const NavbarUser = () => {
  return (
    <div>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img src="/logo-brands.png" alt="logo" width="80%" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto px-auto ">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="#recommendation">Cari Kost</Nav.Link>
              <Nav.Link href="/login" className="ms-5 border-login">
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarUser;
