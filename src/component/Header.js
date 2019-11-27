import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">SellME</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#">Get</Nav.Link>
        <Nav.Link href="#">Login</Nav.Link>
        <Nav.Link href="#">Join</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;
