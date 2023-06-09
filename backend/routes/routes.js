const express = require("express");
const session = require("express-session");
const router = express.Router();
const signup = require("../models/user.js");

require("dotenv").config({ path: "./config.env" });
const axios = require("axios");
const passport = require("passport");

checkAuthenticated = (req, res, next) => {
  if (req.session.user) {
    console.log("InSIDE checkAuthenticated* method");

    return next();
  } else {
    res.redirect("http://localhost:3000/logIn");
  }
};

router.get("/isAuth", async (req, res) => {
  if (req.user) {
    return res.json(req.user);
  } else {
    return res.status(401).json("unauthorize");
  }
});

router.get(
  "/home",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
  function (req, res) {
    //Successful authentication, redirect secrets.

    res.redirect("http://localhost:3000");
  }
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

// a variable to save a session
var userSession;

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login/failed" }),
  function (req, res) {
    // Successful authentication, redirect secrets.
    console.log("SUCCESS.....2" + JSON.stringify(req.user));
    req.session.user = req.user;

    console.log(
      "From User Session#########****** :" + JSON.stringify(req.session)
    );
    console.log(
      "From User Session######### :" + JSON.stringify(req.session.user)
    );
    res.redirect("http://localhost:3000");
  }
);

// *****************************************user********************************************** //
