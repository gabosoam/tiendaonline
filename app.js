var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



var users = require('./routes/users');
var categoria = require('./routes/categoria');
var cliente = require('./routes/cliente');
var detalle = require('./routes/detalle');
var marca = require('./routes/marca');
var modelo = require('./routes/modelo');
var producto = require('./routes/producto');
var sucursal = require('./routes/sucursal');
var venta = require('./routes/venta');
var admin = require('./routes/admin');
var index = require('./routes/index');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("html", require("ejs").renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', index);
app.use('/users', users);
app.use('/categoria', categoria);
app.use('/cliente', cliente);
app.use('/detalle', detalle);
app.use('/marca', marca);
app.use('/modelo', modelo);
app.use('/producto', producto);
app.use('/sucursal', sucursal);
app.use('/venta', venta);
app.use('/admin', admin);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
