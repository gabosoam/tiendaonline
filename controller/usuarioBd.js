var mysql = require('mysql');
var config = require('../config/configuracion.js');


var connection = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

module.exports = {


    insertar: function () {

    },
    modificar: function () {

    },
    eliminar: function () {

    },
    comprobarDatos: function (user, callback) {
        connection.getConnection(function (err, connection) {

            if (err) {
                callback(err, null);
            } else {
                connection.query('SELECT * FROM usuario Where nombreUsuario = ?', user.nombreUsuario, function (error, results, fields) {//



                    if (error) {
                        callback('error en la consulta: ' + error, null);
                   
                    } else {
                        var usuarioDatos = {};
                        if (results[0]) {


                            if (user.passwordUsuario === results[0].passwordUsuario) {

                                usuarioDatos = {
                                    nombreUsuario: results[0].nombreUsuario,
                                    passwordUsuario: results[0].passwordUsuario
                                };
                                callback(null, usuarioDatos);

                            } else {
                                callback("Contraseña incorrecta",null);

                            }

                        } else {
                           callback("El usuario no existe", null );

                        }

                        
                    }
                   
                    connection.release();
                });
            }
        });
    }
}