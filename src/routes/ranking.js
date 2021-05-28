const express = require('express');
const router = express.Router();
const RankingController  = require('../app/controllers/RankingController');

router.get('',RankingController.gettop)

module.exports = router;