const path = require('path');
const express = require("express");
const exphbs  = require('express-handlebars');
const morgan  = require("morgan");
const { render } = require('ejs');
const methodOverride = require('method-override');
const Article = require('./app/models/article')
const app = express();
const port = 3000;

const route = require('./routes');  
const db = require('./config/db');

//connect to db
db.connect();

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