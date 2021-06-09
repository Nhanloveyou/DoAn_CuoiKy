const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');
const authController =  require('../app/controllers/AuthController')

//newsController.index
router.get('/stored/courses',authController.authRole, meController.storedCourses);
router.get('/trash/courses',authController.authRole, meController.trashCourses);
// router.get('/', newsController.index)

module.exports = router;