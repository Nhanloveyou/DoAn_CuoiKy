const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

//newsController.index
router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:id/edit', courseController.edit);
router.post('/handle-form-actions', courseController.handleFormActions);
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.get('/:slug', courseController.show);
router.delete('/:id', courseController.destroy);
router.delete('/:id/force', courseController.forceDestroy);
router.post('/:id/comments', courseController.comment);
// router.get('/', newsController.index)

module.exports = router;