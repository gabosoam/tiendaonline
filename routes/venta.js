var express = require('express');
var router = express.Router();
var venta = require('../controller/ventaBd');




/* GET home page. */
router.post('/', function (req, res, next) {


  venta.insertar(req.body, function (error, resultado) {
    if(error){
      console.log(error);
    }else{
      console.log(resultado);
    }
  
    res.redirect('/');
    
  
  });


});



module.exports = router;
