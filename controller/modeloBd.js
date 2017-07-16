var mysql = require('mysql');
var config = require('../config/configuracion.js');


var connection = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

module.exports = {


    insertar: function (datos, callBack) {
        connection.getConnection(function (error, connection) {
            connection.query('INSERT INTO modelo SET ?', datos, function (err, results, fields) {

                if (err) {
                    console.log('el error es: ' + err);
                    callBack(err, null);
                } else {
                    if (results.affectedRows > 0) {
                        callBack(null, 'Los datos han sido ingresados');
                    }
                }
                ;

            });

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
                connection.query('SELECT * FROM v_modelo;', function (error, results, fields) {

                    if (error) {
                        callback('error en la consulta: ' + error, null);
                    } else {


                        callback(null, { modelos: results });

                        connection.release();


                    }
                });
            }
        });
    },

    buscarPorCategoria: function (categoria, callback) {
        connection.getConnection(function (err, connection) {
            if (err) {
                callback(err, null);
            } else {
                connection.query('SELECT * FROM v_modelo WHERE categoria=?;', categoria, function (error, results, fields) {

                    if (error) {
                        callback('error en la consulta: ' + error, null);
                    } else {


                        callback(null, { modelos: results });

                        connection.release();


                    }
                });
            }
        });
    },

    buscarPorTermino: function (termino, callback) {
        connection.getConnection(function (err, connection) {
            if (err) {
                callback(err, null);
            } else {
                connection.query('SELECT * FROM v_modelo WHERE modelo LIKE \'%' + termino + '%\' OR categoria LIKE \'%' + termino + '%\' OR marca LIKE \'%' + termino + '%\';', function (error, results, fields) {

                    if (error) {

                        callback('error en la consulta: ' + error, null);
                    } else {


                        callback(null, { modelos: results });

                        connection.release();


                    }
                });
            }
        });
    },

    obtenerDatos: function (codigo, callback) {

        connection.getConnection(function (err, connection) {
            if (err) {
                callback(err, null);
            } else {
                connection.query('SELECT * FROM v_modelo WHERE codigo=?', codigo, function (error, results, fields) {

                    if (error) {


                        callback('error en la consulta: ' + error, null);
                    } else {


                        callback(null, results);

                        connection.release();


                    }
                });
            }
        });
    },

}