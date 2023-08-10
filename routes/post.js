const express = require('express');

const router =express.Router();
const postController = require('../controllers/post_controller');


console.log('post router loaded');

router.post('/create',postController.create);

 
module.exports = router;