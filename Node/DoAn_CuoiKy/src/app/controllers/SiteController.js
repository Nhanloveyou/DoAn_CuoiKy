const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SiteController{
    // [GET]/ 
    // name = req.user.name;
    async index(req, res, next ){ 
    Course.find({})
        .then(courses => {
            // courses = courses.map(course => course.toObject())
            res.render('course', {
                courses: multipleMongooseToObject(courses), 
                name: req.user.name
            });
        })
        .catch(next);
        // .catch(error => next(error));
        // let query = Course.find({});
        // if (req.query.name != null && req.query.title != ''){
        //     query = query.regex('name', new RegExp(req.query.name, 'i'))
        // }
        // try{
        //     const courses = await query.exec()
        //     res.render('course', {
        //         courses: multipleMongooseToObject(courses),
        //         name: req.user.name,
        //         searchOptions: req.query
        //     })
        // } catch{
        //     res.redirect('/')
        // }
    }
    //[GET] /search
    show(req, res){
        res.render('search');
    }

    homepage(req, res){
        res.render('homepage');
    }

    quiz(req, res){
        res.render('courses/quiz', {name: req.user.name});
    }

    todo(req, res){ 
        res.render('todo', {name: req.user.name});
    }

    rankingpage(req, res){
        res.render('rankingpage', {name: req.user.name});
    }

    landing(req, res, next) {
        res.send('LandingPage');
    }
}



module.exports = new SiteController;