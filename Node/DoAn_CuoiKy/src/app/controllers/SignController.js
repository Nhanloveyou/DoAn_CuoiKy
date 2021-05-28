const Course = require('../models/Course')
const { mongooseToObject } = require('../../util/mongoose');


class SignController{
    profile(req, res, next){
        res.render('user/profile', {name: req.user.name} );
    }    

    logout(req, res, next) {
        req.logout();
        res.redirect('/user/signin');
    }
    
    signup(req, res, next) {
        var messages = req.flash('error');
        res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
    }

    signin(req, res, next) {
        var messages = req.flash('error');
        res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
    }
}

module.exports = new SignController;