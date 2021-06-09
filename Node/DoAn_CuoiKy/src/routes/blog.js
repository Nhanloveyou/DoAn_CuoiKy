const express = require('express');
const router = express.Router();
const blogController = require('../app/controllers/BlogController');
const authController = require('../app/controllers/AuthController');

router.get('/new',authController.authUser, blogController.new);
router.post('/store', blogController.store);
router.get('/:slug',authController.authUser, blogController.show);
router.get('/',authController.authUser, blogController.index);

module.exports = router;