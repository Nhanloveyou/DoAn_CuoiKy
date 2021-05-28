const path = require('path');
const express = require("express");
const exphbs  = require('express-handlebars');
const morgan  = require("morgan");
const { render } = require('ejs');
const methodOverride = require('method-override');
const Article = require('./app/models/article');
var favicon = require('serve-favicon');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');

const app = express();
const port = 3000;

const route = require('./routes');  
const db = require('./config/db');

//connect to db
db.connect();
require('./config/db/passport');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({secret: 'mysupersecret', resave: false, saveUninitialized: false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname,'public')));

route(app);
app.engine('.hbs', exphbs({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b, 
    }
}));
app.set('view engine', '.hbs');

app.set('views', path.join(__dirname, 'resources', 'views'));

// console.log(__dirname)
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
