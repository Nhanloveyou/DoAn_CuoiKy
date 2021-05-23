const Course = require('../models/article');
const { multipleMongooseToObject } = require('../../util/mongoose');
const Article = require('../models/article');
const article = require('../models/article');

class BlogController{
    // [GET] Trang tạo mới
    // async index(req, res){
    //     const articles = await Article.find().sort({ createdAt: 'desc' })
    //     res.render('articles/index', { articles: articles })
    // }

    index(req, res, next){

        Article.find({})
            .then(articles => res.render('articles/index', {
                articles: multipleMongooseToObject(articles)
            }))
            .catch(next)
    }

    

    // index(req, res){
    //     res.send('Hello World');
    // }

    new(req, res) {
        res.render('articles/new', { article: new Article() })
    }
}

module.exports = new BlogController;