const mongoose =require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

//creating schema
const userSchema = new mongoose.Schema({
        email: {
           type:String,
           required:true,
           unique:true
    },
        password:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        }
  },{
    //created and update at
    timestamps:true
  });

  //compiling our schema into a Model.
  const User =  mongoose.model('User', userSchema);

  module.exports = User;