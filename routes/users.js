const express = require('express');

const router =express.Router();
const usersController =require('../controllers/users_controller');

console.log('users router loaded');

router.get('/profile',usersController.profile);
router.use('/',require('./post'))
 
module.exports = router;