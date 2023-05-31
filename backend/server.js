const express = require("express");

const app = express();

const bodyParser = require("body-parser");

require("dotenv").config({ path: "./config.env" });

const cors = require("cors");

const axios = require("axios");

const mongoose = require("mongoose");

const db = process.env.ATLAS_URI;

const port = process.env.PORT;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  credentials: true, // To enable HTTP cookies over CORS
  "Access-Control-Allow-Credentials": true, // To enable HTTP cookies over CORS
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

//Node.js body parsing middleware.
app.use(bodyParser.json());

//A Node.js framework which lets us access MongoDB in an object-oriented way.
mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true })

const connection = mongoose.connection;

       connection.once("open", function() {
          console.log("MongoDB database connetion established succeessfully.");
        })

app.use("/", (req,res) => 
    res.send("Hello World!")
)
app.listen(port, () =>
  console.log("express server running on port no. " + port)
);
