const path = require('path');
const express = require("express");
const exphbs  = require('express-handlebars');
// const morgan  = require("morgan");
const methodOverride = require('method-override');
// const Article = require('./app/models/article')
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const validator = require('express-validator');
require('./config/passport');

const route = require('./routes');  
const db = require('./config/db');
const hbs = require('handlebars');

//connect to db
db.connect();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(methodOverride('_method'));

app.use(validator());
app.use(cookieParser());
app.use(session({secret: 'mysupersecret', resave: false, saveUninitialized: false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname,'public')));

route(app);
app.engine('.hbs', exphbs({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b, 
        compare: (c, opts) => {
            if(c == 'web'){
                return opts.fn(this)
            }
            else{
                return opts.inverse(this)
            }
        }
    }
}));

hbs.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
})

app.set('view engine', '.hbs');

app.set('views', path.join(__dirname, 'resources', 'views'));


app.listen(port, () => console.log(`App listening at http://localhost:${port}`));