const Course = require('../models/article');
const { multipleMongooseToObject } = require('../../util/mongoose');
const Article = require('../models/article');
const article = require('../models/article');
const {mongooseToObject} = require('../../util/mongoose');

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

    store(req, res, next){
        const article = new Article(req.body);
        article.save()
            .then(() => res.redirect('/articles'))
            .catch(error => {
            })
             
    }

    show(req, res, next){
        Article.findOne({slug: req.params.slug})
            .then((article) => {
                res.render('articles/show', {article: mongooseToObject(article)})
            })
            .catch(next);
    }

}

module.exports = new BlogController;