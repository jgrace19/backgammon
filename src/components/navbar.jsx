import React, { Component } from "react";

//Stateless functional component

const NavBar = ({ turn }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
        It's {turn} 's turn
      </a>
    </nav>
  );
};

export default NavBar;
