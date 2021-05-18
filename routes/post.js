const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports = app => {
    app.get('/home', (req, res) => {
        Post.find({}).lean()
            .then(posts => {
                res.render('index', { posts });
            })
            .catch(err => {
                console.log(err.message);
            })
    });
    app.get('/posts/new', (req, res, next) => {
        res.render('newpost', { title: 'Index || newpost' });
    });
    app.post('/posts/new', (req, res) => {
        // INSTANTIATE INSTANCE OF POST MODEL
        const post = new Post(req.body);

        // SAVE INSTANCE OF POST MODEL TO DB
        post.save((err, post) => {
            // REDIRECT TO THE ROOT
            return res.redirect(`/home`);
        })
    });
    app.get("/posts/:id", function (req, res) {
        // LOOK UP THE POST
        Post.findById(req.params.id).lean().populate('comments')
            .then((post) => {
                res.render('show', { post })
            })
            .catch((err) => {
                console.log(err.message)
            })
    });
    // CREATE Comment
    app.post("/posts/:postId/comments", function (req, res) {
        // INSTANTIATE INSTANCE OF MODEL
        const comment = new Comment(req.body);

        // SAVE INSTANCE OF Comment MODEL TO DB
        comment
            .save()
            .then(comment => {
                return Post.findById(req.params.postId);
            })
            .then(post => {
                post.comments.unshift(comment);
                return post.save();
            })
            .then(post => {
                res.redirect(`/home`);
            })
            .catch(err => {
                console.log(err);
            });
    });
};

