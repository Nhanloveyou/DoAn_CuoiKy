const Comment = require('../models/comment');
module.exports = app => {
    // CREATE Comment
    app.post("/posts/:postId/comments", function (req, res) {
        // INSTANTIATE INSTANCE OF MODEL
        const comment = new Comment(req.body);

        // SAVE INSTANCE OF Comment MODEL TO DB
        comment
            .save()
            .then(comment => {
                // REDIRECT TO THE ROOT
                return res.redirect(`/posts/:postId`);
            })
            .catch(err => {
                console.log(err);
            });
    });
};