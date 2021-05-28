const meRouter = require('./me');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const signRouter = require('./sign');
const rankingRouter=require('./ranking')
const articleRouter = require('./articles');
const blogRouter = require('./blog');

function route(app){
    app.use('/me', meRouter);
    app.use('/courses', coursesRouter);
    app.use('/articles', blogRouter);
    app.use('/ranking',rankingRouter);
    app.use('/user', signRouter);
    app.use('/', siteRouter);
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
      
    if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
        message: err.message,
        error: err
        });
    });
    }
     
    app.use(function(req, res, next) {
        res.locals.login = req.isAuthenticated();
        next();
    });
    
    app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
    });
}

module.exports = route;