var mysql = require('mysql');
var config = require('../config/configuracion.js');


var connection = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

module.exports = {


      insertar: function (datos, callback) {
        

        connection.getConnection(function (err, connection) {
            if (err) {
                callback(err, null);
            } else {
                connection.query('UPDATE empresa SET rucEmpresa=?, nombreEmpresa=?, direccionEmpresa=?, telefono1Empresa=?, telefono2Empresa=?', [datos.rucEmpresa,datos.nombreEmpresa, datos.direccionEmpresa, datos.telefono1Empresa,datos.telefono2Empresa], function (error, results, fields) {//
                    if (error) {
                        callback('error en la consulta: ' + error, null);
                    } else {


                        callback(null, fields);

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
                connection.query('SELECT  * FROM v_empresa;', function (error, results, fields) {//
                    if (error) {
                        callback('error en la consulta: ' + error, null);
                    } else {


                        callback(null, results);

                        connection.release();


                    }
                });
            }
        });



    }
}