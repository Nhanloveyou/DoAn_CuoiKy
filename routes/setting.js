const Post = require('../models/post');
module.exports = app => {
    app.get('/setting', (req, res) => {
        Post.find({}).lean()
            .then(posts => {
                res.render('setting', { posts });
            })
            .catch(err => {
                console.log(err.message);
            })
    })
};