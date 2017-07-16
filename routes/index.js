var express = require('express');
var router = express.Router();
var categoria = require('../controller/categoriaBd');

/* GET home page. */
router.get('/', function (req, res, next) {
  categoria.buscar(function (error, datos) {
    if (error) {
      console.log(error);
    } else {
      console.log(datos);
    }
  });
  res.render('index', { Empresa: 'Tienda Online' });
});

module.exports = router;
