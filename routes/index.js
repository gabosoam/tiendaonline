var express = require('express');
var router = express.Router();
var categoria = require('../controller/categoriaBd');
var sessionCliente = require('express-session');
var cliente = require('../controller/clienteBd');
var modelo = require('../controller/modeloBd');

router.use(sessionCliente({
  secret: '12313232cliente',
  cookie: { maxAge: 6000000000000000000 },
  resave: false,
  saveUninitialized: true
}));



/* GET home page. */
router.get('/', isLoggedIn, function (req, res, next) {
  res.render('index', { Empresa: 'Express', usuario: sessCliente.usuarioDatosCliente });
});

router.get('/registro', function (req, res, next) {
  res.render('registro', { Empresa: 'Tienda Online' });
});

router.get('/login', function (req, res, next) {
  res.render('loginUsuario', { Empresa: 'Tienda Online', error: null });
})

router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {

      res.render('index', { Empresa: 'Express', usuario: null });
    }
  });
});





function isLoggedIn(req, res, next) {
  sessCliente = req.session;
  if (sessCliente.usuarioDatosCliente)
    return next();
  sessCliente.originalUrl = req.originalUrl;
  res.render('index', { Empresa: 'Express', usuario: null });

}


router.post('/loginPass', function (req, res) {
  console.log(req.body);
  var sessCliente = req.session;

  cliente.comprobarDatos(req.body, function (err, usuario) {

    if (err) {
      console.log(err);
      res.render('loginUsuario', { error: err });
    } else {
      sessCliente.usuarioDatosCliente = usuario;
      res.redirect('/');

    }
  });
});


module.exports = router;
