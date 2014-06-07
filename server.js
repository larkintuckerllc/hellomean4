var express = require('express');
var app = express();

// CONTRIBUTED MIDDLEWARE
var serveStatic = require('serve-static');
app.use(serveStatic('public', {'index': ['index.html']}));
var bodyParser = require('body-parser');
app.use(bodyParser());

// DATABASE CONNECTION
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
mongoose.connect('mongodb://localhost/winedb');

// ROUTES
app.use('/linkedin', require('./server/routes/linkedin'));
app.use('/wines', require('./server/routes/wines'));
app.use('/wineries', require('./server/routes/wineries'));

app.listen(3000);
