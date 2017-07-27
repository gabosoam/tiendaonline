var express = require('express');
var router = express.Router();
var usuario = require('../controller/usuarioBd');
var session = require('express-session');
var empresa = require('../controller/empresa');

router.use(session({
    secret: 'asdasd52121admin',
    cookie: { maxAge: 6000000000000000000 },
    resave: false,
    saveUninitialized: true
}));

/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect('/admin/productos');
});

/* Administración productos. */
router.get('/productos', isLoggedInAdmin, function (req, res, next) {
    res.render('admin', { Empresa: 'Administración', usuario: sess.usuarioDatos });
});
/* Administración empresa */
router.get('/empresa', isLoggedInAdmin, function (req, res, next) {

    empresa.buscar(function (error, datos) {
        res.render('Empresa', { Empresa: 'Administración', usuario: sess.usuarioDatos, empresa: datos, mensaje: null });
    })

});
/* Editar la empresa */
router.post('/editar', isLoggedInAdmin, function (req, res, next) {
    empresa.insertar(req.body, function (error, resultado) {
        if (error) {
            empresa.buscar(function (error, datos) {
                res.render('Empresa', { Empresa: 'Administración', usuario: sess.usuarioDatos, empresa: datos, mensaje: 'Existio un error' });
            })
        } else {
            empresa.buscar(function (error, datos) {
                res.render('Empresa', { Empresa: 'Administración', usuario: sess.usuarioDatos, empresa: datos, mensaje: 'Datos de la empresa modificados correctamente' });
            })
        }
    });
});
/* Valida una sesión existente */
function isLoggedInAdmin(req, res, next) {
    sess = req.session;
    if (sess.usuarioDatos)
        return next();
    sess.originalUrl = req.originalUrl;
    res.redirect('/admin/login');

}
/* Cerrar sesión Administrador */
router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {

            res.redirect('/admin/login');
        }
    });
});





router.get('/login', function (req, res, next) {
    res.render('login', { title: 'Express' });
});

router.get('/compras', isLoggedInAdmin, function (req, res, next) {
    res.render('compra', { Empresa: 'Administración', usuario: sess.usuarioDatos });
});


router.post('/loginPass', function (req, res) {
   
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
