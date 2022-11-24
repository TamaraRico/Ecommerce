var express = require('express');
var path = require('path');
var logger = require('morgan');
const validator = require('express-validator');
const bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 4000);

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/')));


// Routes
app.use(require('./routes/index'));
app.use(require('./routes/signup'));
app.use(require('./routes/login'));
app.use(require('./routes/payInfo'));
app.use(require('./routes/userInfo'))

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.listen(app.get('port'), () => {
    console.log('Server is in port', app.get('port'));
});

// error handler

module.exports = app;