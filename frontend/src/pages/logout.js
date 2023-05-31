import React from "react";
import axios from "axios";

export class Logout extends React.Component {
  render() {
    return (
      <div className="home">
        <h3>You are being logged out...</h3>
      </div>
    );
  }

  componentDidMount() {
    window.open(`http://localhost:5000/logout`, "_self");
  }
}
