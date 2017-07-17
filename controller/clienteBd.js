var mysql = require('mysql');
var config = require('../config/configuracion.js');
var bcrypt = require('bcrypt-nodejs');
var generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}


var connection = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

module.exports = {


    insertar: function (datos, callback) {
        var informacion = {
            nombreCliente: datos.nombreCliente,
            apellidoCliente: datos.apellidoCliente,
            telefonoCliente: datos.telefonoCliente,
            correoCliente: datos.correoCliente,
            passwordCliente: generateHash(datos.passwordCliente)
        }

        connection.getConnection(function (err, connection) {
            if (err) {
                callback(err, null);
            } else {
                connection.query('INSERT INTO cliente SET ?;', informacion, function (error, results, fields) {//
                    if (error) {
                        callback('error en la consulta: ' + error, null);
                    } else {


                        callback(null, { categorias: results });

                        connection.release();


                    }
                });
            }
        });

    },
    modificar: function () {

    },
    eliminar: function () {

    },
    buscar: function (callback) {
        connection.getConnection(function (err, connection) {
            if (err) {
                callback(err, null);
            } else {
                connection.query('SELECT  * FROM v_cliente;', function (error, results, fields) {//
                    if (error) {
                        callback('error en la consulta: ' + error, null);
                    } else {


                        callback(null, { categorias: results });

                        connection.release();


                    }
                });
            }
        });



    },

    comprobarDatos: function (user, callback) {
        connection.getConnection(function (err, connection) {

            if (err) {
                callback(err, null);
            } else {
                connection.query('SELECT * FROM cliente Where correoCliente = ?', user.correoCliente, function (error, results, fields) {//



                    if (error) {
                        callback('error en la consulta: ' + error, null);

                    } else {
                        var usuarioDatos = {};
                        if (results[0]) {



                            if (bcrypt.compareSync(user.passwordCliente, results[0].passwordCliente)) {

                                usuarioDatos = results[0];
                                callback(null, usuarioDatos);

                            } else {
                                console.log("Contraseña incorrecta");
                                callback("Contraseña incorrecta", null);

                            }

                        } else {
                            callback("El usuario no existe", null);

                        }


                    }

                    connection.release();
                });
            }
        });
    }


}