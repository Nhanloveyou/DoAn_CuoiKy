const Course = require('../models/Course')
const { multipleMongooseToObject } = require('../../util/mongoose');
const user = require('../models/user');
class RankingController{
    gettop(req, res, next ){
        var mysort = { exp: -1 };
        user.find({}).sort(mysort)
        .then(users => {
            // courses = courses.map(course => course.toObject())
            res.render('rankingpage', {
                users: multipleMongooseToObject(users)
            });
        })
        .catch(next);
        // .catch(error => next(error));
    }

}

module.exports = new RankingController;