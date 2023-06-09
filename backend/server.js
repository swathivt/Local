require("dotenv").config({ path: "./config.env" });
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoDBStore = require("connect-mongodb-session")(session);
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");


const app = express();

//For database connection
const db = process.env.ATLAS_URI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

// Create all collections here..
const Users = require("./models/user");
passport.use(Users.createStrategy());

// setting up connect-mongodb-session store
const mongoDBstore = new MongoDBStore({
  uri: db,
  collection: "userSessions",
});

// Express-Session - see documentation for other options

app.use(
  session({
    name: process.env.COOKIE_NAME, //name to be put in "key" field in postman etc
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoDBstore,

    
  })
);

const corsOptions = {
  origin: 'http://localhost:3000',
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "credentials": true, // To enable HTTP cookies over CORS 
  "Access-Control-Allow-Credentials" : true, // To enable HTTP cookies over CORS
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(
  cors(corsOptions)
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


// cookie parser middleware
app.use(cookieParser());


//Routers
app.use("/", require("./routes/routes.js"));



app.use(passport.initialize()); //init passport on every route call
app.use(passport.session()); // allow passport to use "express-session",persistent login sessions

passport.serializeUser(function (sessUser, done) {
  //done(null, sessUser.username);
  done(null, { user_id: sessUser.username });
});

passport.deserializeUser(function (userName, done) {
  console.log('DeserializeUser called' + JSON.stringify(userName));
  Users.findOne({ user_id: userName}).then(user => {
    console.log('**** Deserialize user, user:')
		console.log(user)
    console.log('--------------')
    done(null, user);
    
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, done) {
      
      console.log(JSON.stringify(profile));
      const sessUser = {
        username: profile.emails[0].value,
        firstname: profile.name.givenName,
        lastname: profile.name.familyName,
        signupby: profile.provider,
        socialmediaid: profile.id,
      };
      Users.findOrCreate(sessUser, function (err, user) {
        return done(err, sessUser);
      });
      console.log("after");
      done(null, sessUser);
      //req.session.user = sessUser; // Auto saves session data in mongo store
    }
  )
);





const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
