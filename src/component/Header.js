import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">SellME</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#">Get</Nav.Link>
        <Nav.Link href="#">Login</Nav.Link>
        <Nav.Link href="#">Join</Nav.Link>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
      </Form>
    </Navbar>
  );
};

export default Header;
