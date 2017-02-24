var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks'); //api to work with mongodb

var port = 3000;

var app = express() ;

//View Engine
//let system know what folder we want to use for our views
app.set('views', path.join(__dirname, 'views')); //tell system our views will be in the views folder
//specify engine
app.set('view engine', 'ejs');
//render files with html extension
app.engine('html', require('ejs').renderFile);

//Set static folder
app.use(express.static(path.join(__dirname, 'client')));

//body parser mw
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', tasks);

app.listen(port, function(){
  console.log('Server started on port '+port);
});
