var express = require('express');
var router = express.Router();
router.io = require('socket.io')();
var categorias = require('../controller/categoriaBd');
var modelos = require('../controller/modeloBd');
var marcas = require('../controller/marcaBd');
var ventas = require('../controller/ventaBd');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.io.on('connection', function (socket) {

  
/* Obtiene lista de categorías */
  socket.on('Cargar categorias', function (callback) {
    categorias.buscar(function (error, datos) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, datos);
      }
    });

  });
/* Obtiene lista de marcas */
    socket.on('Cargar marcas', function (callback) {
    marcas.buscar(function (error, datos) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, datos);
      }
    });

  });
/* Obtiene lista de modelos */
  socket.on('Cargar modelos', function (callback) {
 
    modelos.buscar(function (error, datos) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, datos);
      }
    });

  });
/* Obtiene lista de ventas */
   socket.on('Cargar ventas', function (callback) {
 
    ventas.buscar(function (error, datos) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, datos);
      }
    });

  });
/* Obtiene lista de ventas realizadas */
   socket.on('Cargar ventas realizadas', function (callback) {
 
    ventas.buscarRealizadas(function (error, datos) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, datos);
      }
    });

  });
/* Obtiene lista de modelos por categoría */
  socket.on('Cargar por categoria', function (categoria,callback) {


    modelos.buscarPorCategoria(categoria, function (err, datos) {

      if (err) {
        callback(err, null);
      } else {
        callback(null, datos);
      }
    });
  });
/* Obtiene lista de modelos por término de búsqueda */
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
