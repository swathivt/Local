import React from "react";
import axios from "axios";
import { NavBar } from "../components/sections/navbar.js";

import { Footer } from "../components/sections/footer.js";




export function Home() {
 
    return (
      <div id="pageContainer">
        <NavBar />
        <div className="container">
          <div className="pageTitle">
            <h1>Welcome</h1>
          </div>
          <p>Click on Login for Google Authintication</p>
        </div>
        <div className="homeFooter">
          <Footer />
        </div>
      </div>
    );
  }

