const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async function (email, password, done) {
      try {
        // Find the user and establish the identity
        const user = await User.findOne({ email: email });

        if (!user || user.password !== password) {
          console.log('Invalid username and password');
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        console.log('Error in finding user --> passport');
        return done(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch (err) {
    console.log('Error in finding user --> passport');
    return done(err);
  }
});

//check the user is authenticated
passport.checkAuthentication = function(req,res,next){
    //ifthe user is signed in pass request to next function (which is controller action)
  if(req.isAuthenticated){
    return next();
  }
  //ifthe user is not signed in
  return res.redirect('/users/sign-in');

}

passport.setAuthenticatedUser = function(req,res,next){

if(req.isAuthenticated()){
  //req.user contains current signed in user from the session cookie and we are just sending this to the locals for the views
   res.locals.user = req.user
}
next();

}

module.exports = passport;