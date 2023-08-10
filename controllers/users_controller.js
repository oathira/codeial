const User = require('../models/user'); // Assuming the User model is imported correctly


module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}


// render the sign up page
module.exports.signUp = function(req, res){
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
  if(req.isAuthenticated()){
   return res.redirect('/users/profile');
  }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = async function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    console.log("passwords are not equal");
    return res.redirect('back');
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      await User.create(req.body);
      return res.redirect('/users/sign-in');
    } else {
      console.log("this email already exist");
      return res.redirect('back');
    }
  } catch (err) {
    console.log('Error in signing up:', err);
    return res.redirect('back');
  }
};


// sign in and create a session for the user
module.exports.createSession = function(req, res){
  return res.redirect('/'); 
}


module.exports.destroySession = function(req, res){
  req.logout(function(err){
    if (err) {
      // Handle any potential error that occurred during logout
      console.error(err);
    }
    // Redirect the user to the home page after successful logout
    return res.redirect('/');
  });
};
