const meRouter = require('./me');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const todoRouter = require('./todolist');
const rankingRouter=require('./ranking')
const userRouter=require('./user')
const articleRouter = require('./articles');
const blogRouter = require('./blog');

function route(app){
    app.use('/me', meRouter);
    app.use('/courses', coursesRouter);
    app.use('/articles', blogRouter);
    app.use('/ranking',rankingRouter);
    app.use('/user',userRouter);
    app.use('/', siteRouter);
    app.use('/', todoRouter);
    
}

module.exports = route;