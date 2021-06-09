const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/AuthController');

const siteController = require('../app/controllers/SiteController');
router.get('/search', siteController.show);
router.get('/courses',authController.authUser, siteController.index);
router.get('/home', siteController.homepage);
router.get('/ranking', siteController.rankingpage);
router.get('/quiz',authController.authUser, siteController.quiz);
router.get('/todo',authController.authUser, siteController.todo);
router.get('/', siteController.landing);
// router.get('/', siteController.login);

module.exports = router;