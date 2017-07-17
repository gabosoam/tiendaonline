var express = require('express');
var router = express.Router();
var cliente = require('../controller/clienteBd');

router.post('/',function(req,res,next){
  cliente.insertar(req.body,function(error,resultado){
    if(error){
      console.log(error);
      res.redirect('/registro');
    }else{
      res.redirect('/');
    }
  });

});




module.exports = router;
