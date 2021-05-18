const Post = require('../models/post');
module.exports = app => {
    app.get("/search", (req, res) => {
        res.render("search");
    });
};