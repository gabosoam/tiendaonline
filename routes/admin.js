var express = require('express');
var router = express.Router();
var usuario = require('../controller/usuarioBd');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect('/admin/productos');
});

router.get('/login', function (req, res, next) {
    res.render('login', { title: 'Express' });
});

router.get('/productos', isLoggedIn, function (req, res, next) {
    res.render('admin', { Empresa: 'Express', usuario: sess.usuarioDatos });
});

function isLoggedIn(req, res, next) {
    sess = req.session;
    if (sess.usuarioDatos)
        return next();
    sess.originalUrl = req.originalUrl;
    res.redirect('/admin/login');

}
router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
          
            res.redirect('/admin/login');
        }
    });
});

router.post('/loginPass', function (req, res) {
    console.log();
    var sess = req.session;
    var user = {
        nombreUsuario: req.body.nombreUsuario,
        passwordUsuario: req.body.passwordUsuario
    }


    usuario.comprobarDatos(user, function (err, usuario) {

        if (err) {
            res.redirect('/admin/');
        } else {
            sess.usuarioDatos = usuario;
            res.redirect('/admin/productos');

        }
    });
});



module.exports = router;
