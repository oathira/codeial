const User = require('../../../models/user'); 
const env = require('../../../config/environment');
const jwt = require('jsonwebtoken');

// sign in and create a session for the user
module.exports.createSession = async function(req, res){
    try{
        let user = await User.findOne({email : req.body.email});
        if(!user || user.password != req.body.password){
            return res.json(422,{
                message:"Invalid username/password"
               })}
            return res.json(200,{
                message:"Signin successful,here is your token please keep it safe",
                data :{
                    token : jwt.sign(user.toJSON(),env.jwt_secret,{expiresIn :'100000'})
                }
               })

    }catch(err){
        console.log('*********',err);
      return res.json(500,{
       message:"Internal server error"
      
    })}
   
 
  }
  