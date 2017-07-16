var express = require('express');
var router = express.Router();
var compra = require('../controller/compraBd');

/* GET home page. */
router.post('/', function (req, res, next) {
  console.log(req.body);
  compra.insertar(req.body, function (error, resultado) {
    if(error){
      console.log(error);
    }else{
      console.log(resultado);
    }
    res.redirect('/');
  
  });


});



module.exports = router;
