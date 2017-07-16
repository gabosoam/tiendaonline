var express = require('express');
var router = express.Router();
router.io = require('socket.io')();
var categorias = require('../controller/categoriaBd');
var modelos = require('../controller/modeloBd');
var marcas = require('../controller/marcaBd');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.io.on('connection', function (socket) {

  socket.on('Cargar categorias', function (callback) {
    categorias.buscar(function (error, datos) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, datos);
      }
    });

  });

    socket.on('Cargar marcas', function (callback) {
    marcas.buscar(function (error, datos) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, datos);
      }
    });

  });

  socket.on('Cargar modelos', function (callback) {
 
    modelos.buscar(function (error, datos) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, datos);
      }
    });

  });

  socket.on('Cargar por categoria', function (categoria,callback) {


    modelos.buscarPorCategoria(categoria, function (err, datos) {

      if (err) {
        callback(err, null);
      } else {
        callback(null, datos);
      }
    });
  });

  socket.on('Cargar por termino', function (termino,callback) {

    modelos.buscarPorTermino(termino, function (err, datos) {

      if (err) {
        callback(err, null);
      } else {
        callback(null, datos);
      }
    });
  });

  socket.on('disconnect', function () {

  });
});

module.exports = router;
