// Setup
var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var ejs = require('ejs');
var engine = require('ejs-mate');
var validator = require('express-validator');
var path = require('path');
const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.connect("mongodb://localhost:27017/node-blog", {useNewUrlParser: true, useUnifiedTopology: true});

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Routes
require('./routes/post')(app);
require('./routes/comment')(app);
require('./routes/search')(app);
require('./routes/setting')(app);
require('./routes/auth.js')(app);
// Listen
app.listen(3001, () => {
    console.log('Server listing on 3001');
})