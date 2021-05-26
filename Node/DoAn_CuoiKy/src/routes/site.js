const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');
router.get('/search', siteController.show);
router.get('/courses', siteController.index);
router.get('/home', siteController.homepage);
router.get('/ranking', siteController.rankingpage);

module.exports = router;