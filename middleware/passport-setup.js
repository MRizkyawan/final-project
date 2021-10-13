var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


passport.use(new GoogleStrategy({
    clientID: "345429176534-13bg1b22se4n84l3cev7hqmnm2vjhgv0.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));