import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const NavBar = (props) => {
  //debugger
  return (
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">CryptoCurrency</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link as={NavLink} to="/coins">Coins</Nav.Link>
      <Nav.Link as={NavLink} to="/converting">Convert currencies</Nav.Link>
      <Nav.Link as={NavLink} to="/smth">Smth more</Nav.Link>
    </Nav>
  </Navbar>
  );
};

const mapStateToProps = (state) => {
  return{
    currentPage: state.coinsPage.currentPage
  }
}

const NavBarContainer = connect(mapStateToProps, {})(NavBar)

export default NavBarContainer;
