var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');

var indexRouter = require('./routes/index');
var webapiRouter = require('./routes/webapi');

require('dotenv').config();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/webapi', webapiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

global.o = {}; // 객체
global.f = {}; // 함수
global.c = {}; // 상수

// mysql connection
global.o.mysql = mysql.createConnection({
    host: 'localhost',
    user: process.env.MYSQL_USER_NAME,
    password: process.env.MYSQL_USER_PASSWD,
    database: process.env.MYSQL_DATABASE_NAME,
    dateStrings: 'date'
});

// none check
global.f.is_none = function(value) {
    if (typeof value == 'undefined' || value == null || value == '') return true;
    return false;
}

module.exports = app;
