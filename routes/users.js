const express = require('express');

const router =express.Router();
const usersController =require('../controllers/users_controller');

console.log('users router loaded');

router.get('/profile',usersController.profile);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);
router.use('/',require('./post'))
 
module.exports = router;