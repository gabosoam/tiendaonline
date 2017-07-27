var express = require('express');
var router = express.Router();
var modelo = require('../controller/modeloBd');
var formidable = require('formidable');
var fs = require('fs');
var empresa = require('../controller/empresa');

/* GET home page. */
router.get('/:codigo', isLoggedInModelo, function (req, res, next) {
  modelo.obtenerDatos(req.params.codigo, function (error, datos) {
    if (error) {
      res.send(error);
    } else {
      empresa.buscar(function (error, empresa) {
        res.render('modelo', { Empresa: empresa, Producto: datos, usuario: sessCliente.usuarioDatosCliente });
      })

    }
  })
});
/* Insertar un nuevo producto a la base de datos */
router.post('/', function (req, res, next) {

  var entrada = new formidable.IncomingForm();

  entrada.parse(req, function (err, fields, files) {
    modelo.insertar(fields, function (error, resultado) {
      if (error) {


      } else {

      }
    });
    var oldpath = files.filetoupload.path;
    var newpath = './public/images/modelos/' + fields.idModelo + '.jpg';
    fs.rename(oldpath, newpath, function (err) {
      if (err)
        throw err;
      res.redirect('/admin');
    });

  });


});

/* Comprobar inicio de sesión */
function isLoggedInModelo(req, res, next) {
  sessCliente = req.session;
  if (sessCliente.usuarioDatosCliente)
    return next();
  sessCliente.originalUrl = req.originalUrl;
  modelo.obtenerDatos(req.params.codigo, function (error, datos) {
    if (error) {
      res.send(error);
    } else {
      empresa.buscar(function (error, empresa) {
        res.render('modelo', { Empresa: empresa, Producto: datos, usuario: null });
      })

    }
  })

}


module.exports = router;
