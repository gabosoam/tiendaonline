var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', isLoggedInDetalle, function (req, res, next) {
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
    Total: total,
    usuario: sessCliente.usuarioDatosCliente
  });
});

function isLoggedInDetalle(req, res, next) {
  sessCliente = req.session;
  if (sessCliente.usuarioDatosCliente)
    return next();
  sessCliente.originalUrl = req.originalUrl;
    modelo.obtenerDatos(req.params.codigo, function (error, datos) {
    if (error) {
      res.send(error);
    } else {

      res.render('detalle', { Empresa: 'Tienda Online', Producto: datos,usuario: null });
    }
  })

}


module.exports = router;
