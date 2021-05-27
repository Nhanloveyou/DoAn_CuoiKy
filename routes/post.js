const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');
module.exports = app => {
    app.get('/bloghome', (req, res) => {
        var currentUser = req.user;
        // res.render('home', {});
        console.log(req.cookies);
        Post.find({}).lean().populate('author')
        .then(posts => {
            res.render('blogindex', { posts, currentUser });
            // res.render('home', {});
        }).catch(err => {
            console.log(err.message);
        })
    });
    app.get('/posts/new', (req, res, next) => {
        res.render('newblog', { title: 'Index || newpost' });
    });
    app.post('/posts/new', (req, res) => {
        if (req.user) {
            var post = new Post(req.body);
            post
            .save()
            .then(post => {
                return User.findById(req.user._id);
            })
            .then(user => {
                user.posts.unshift(post);
                user.save();
                // REDIRECT TO THE NEW POST
                res.redirect(`/posts/${post._id}`);
            })
            .catch(err => {
                console.log(err.message);
            });
    } else {
        return res.status(401); // UNAUTHORIZED
    }
});
    app.get("/posts/:id", function (req, res) {
        var currentUser = req.user;
        // LOOK UP THE POST
        Post.findById(req.params.id).lean().populate('comments').populate('author')
            .then(post => {
                res.render("blogshow", { post, currentUser });  
            })
            .catch(err => {
                console.log(err.message);
            });
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
                res.redirect(`/bloghome`);
            })
            .catch(err => {
                console.log(err);
            });
    });
};

