//import { Welcome } from "./logInComp.js";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Image } from "react-bootstrap";

export const NavBar = () => {
  const [loginUserDetails, setLoginUserDetails] = useState([]);

  useEffect(function () {
    getUserDetails();
  }, []);

  async function getUserDetails() {
    try {
      const response = await axios.get("http://localhost:5000/user", {
        responseType: "json",
        withCredentials: true,
      });
      setLoginUserDetails(response.data.userDetails);
    } catch (error) {
      console.log("error", error);
    }
  }

  

  return (
    <div id="header" fixed="top">
      <Navbar.Brand className="logoLink" href="/">
      <Image
                
                fluid
                src="localAppLogoNew.png"
                alt="localApp"
                width ="5%"
            />
        {/* <img className="logo " src="/localAppLogoNew.png" alt="localApp"></img> */}
      </Navbar.Brand>
      {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}

      <Nav>
        <Nav.Link href="/signUp" className="menuItem">
          Signup
        </Nav.Link>
        {/* <UserGreeting /> */}
        {/* <span>Welcome {loginUserDetails.firstname}</span> */}
        <Nav.Link href="/logIn" className="menuItem">
          Login
        </Nav.Link>

        <Nav.Link href="/user/myAccount" className="menuItem">
          MyAccount
        </Nav.Link>
        <Nav.Link href="/logout" className="menuItem">
          Logout
        </Nav.Link>
        <Nav.Link href="/contactus" className="menuItem">
          Contactus
        </Nav.Link>
      </Nav>
    </div>
  );
};
