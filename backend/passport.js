require("dotenv").config({ path: "./config.env" });
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const User = require("./models/user.js");

passport.use(User.createStrategy);

passport.use(
  new GoogleStrategy(
    
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },

    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate(
        { googleId: profile.id, username: profile.id },
        function (err, user) {
          return cb(err, user);
        }
      );

      console.log("User Id is: " + profile.id);
      return cb(null, { userProfile: profile });
    }
  )
);



passport.serializeUser(function (userProfile, done) {
  done(null, userProfile);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
