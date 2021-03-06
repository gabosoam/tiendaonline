var mysql = require('mysql');
var config = require('../config/configuracion.js');


var connection = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

module.exports = {


    insertar: function (datos,callback) {
         connection.getConnection(function (err, connection) {
            if (err) {
                callback(err, null);
            } else {
                connection.query('INSERT INTO venta SET ?;',datos, function (error, results, fields) {//
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
                connection.query('SELECT * FROM v_venta WHERE estado=0;', function (error, results, fields) {

                    if (error) {
                        callback('error en la consulta: ' + error, null);
                    } else {


                        callback(null, { ventas: results });

                        connection.release();


                    }
                });
            }
        });
       

    },

      buscarRealizadas: function (callback) {
        connection.getConnection(function (err, connection) {
            if (err) {
                callback(err, null);
            } else {
                connection.query('SELECT * FROM v_venta WHERE estado=1;', function (error, results, fields) {

                    if (error) {
                        callback('error en la consulta: ' + error, null);
                    } else {


                        callback(null, { ventas: results });

                        connection.release();


                    }
                });
            }
        });
       

    }
}