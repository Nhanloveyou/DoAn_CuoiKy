const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');
const authController = require('../app/controllers/AuthController')

//newsController.index
router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:id/edit',authController.authRole, courseController.edit);
router.put('/:id',authController.authRole, courseController.update);
router.patch('/:id/restore', courseController.restore);
router.get('/:slug', courseController.show);
router.delete('/:id',authController.authRole, courseController.destroy);
router.delete('/:id/force', courseController.forceDestroy);
// router.get('/', newsController.index)

module.exports = router;