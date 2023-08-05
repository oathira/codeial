
 
const passport = require('passport');
const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);


router.post('/create', usersController.create);
//use passport as middle ware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect :'/users/sign-in'} 

),usersController.createSession);

router.use('/',require('./post'));
module.exports = router;
