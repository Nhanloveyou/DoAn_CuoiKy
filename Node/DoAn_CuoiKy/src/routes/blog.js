const express = require('express');
const router = express.Router();
const blogController = require('../app/controllers/BlogController');

router.get('/new', blogController.new);
router.post('/store', blogController.store);
router.get('/:slug', blogController.show);
router.get('/', blogController.index);

module.exports = router;