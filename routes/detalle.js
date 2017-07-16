var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function (req, res, next) {
  var subtotal = req.body.precio * req.body.cantidad;
  var impuestos = subtotal * 12 / 100;
  var total = subtotal + impuestos;

  res.render('detalle', {
    Empresa: 'Tienda Online',
    Modelo: req.body.modelo,
    Cantidad: req.body.cantidad,
    Unitario: req.body.precio,
    Subtotal: subtotal,
    Impuestos: impuestos,
    Total: total
  });
});

module.exports = router;
