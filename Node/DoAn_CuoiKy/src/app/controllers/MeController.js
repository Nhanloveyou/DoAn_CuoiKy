const Course = require('../models/Course')
const {multipleMongooseToObject } = require('../../util/mongoose');

class MeController{
    //[GET] /course/:slug
    storedCourses(req, res, next){
        Course.find({})
            .then(courses => res.render('me/stored-courses', {
                courses: multipleMongooseToObject(courses)
            }))
            .catch(next);
    }

    //[GET] /course/trash/courses
    trashCourses(req,res,next){
        Course.findDeleted({})
            .then(courses => res.render('me/trash-courses', {
                courses: multipleMongooseToObject(courses)
            }))
            .catch(next);
    }
}



module.exports = new MeController();