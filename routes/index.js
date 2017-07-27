var express = require('express');
var router = express.Router();
var categoria = require('../controller/categoriaBd');
var sessionCliente = require('express-session');
var cliente = require('../controller/clienteBd');
var modelo = require('../controller/modeloBd');
var venta = require('../controller/ventaBd');
var empresa = require('../controller/empresa');

/* Datos sesión usuario */
router.use(sessionCliente({
  secret: '12313232cliente',
  cookie: { maxAge: 6000000000000000000 },
  resave: false,
  saveUninitialized: true
}));

/* GET home page. */
router.get('/', isLoggedIn, function (req, res, next) {

    empresa.buscar(function (error, datos) {
        res.render('index', {usuario: sessCliente.usuarioDatosCliente, Empresa: datos, mensaje: null });
    })

});
/* Registro de usuario */
router.get('/registro', function (req, res, next) {
  res.render('registro', { Empresa: empresa.nombre });
});
/*Inicio de sesión del usuario */
router.get('/login', function (req, res, next) {
  res.render('loginUsuario', { Empresa: empresa.nombre, error: null, mensaje: null });
})
/* Cerrar sesión del usuario. */
router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {

      empresa.buscar(function(error,datos){
res.render('index', { Empresa: datos, usuario: null, mensaje: null });
      })

      
    }
  });
});




/* Comprobar sesión del usuario */
function isLoggedIn(req, res, next) {
  sessCliente = req.session;
  if (sessCliente.usuarioDatosCliente)
    return next();
  sessCliente.originalUrl = req.originalUrl;


  empresa.buscar(function (error, datos) {
        res.render('index', {usuario: null, Empresa: datos, mensaje: null });
    })

}

/* Inicio de sesión del usuario */
router.post('/loginPass', function (req, res) {

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
