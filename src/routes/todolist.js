const express = require('express');
const router = express.Router();


router.get('/todo', (req, res , next)  => {
    res.render('courses/todo');
})

module.exports = router;