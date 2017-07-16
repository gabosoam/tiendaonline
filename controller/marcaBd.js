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
    buscar: function (callback) {
        connection.getConnection(function (err, connection) {
            if (err) {
                callback(err, null);
            } else {
                connection.query('SELECT  * FROM v_marca;', function (error, results, fields) {
                    if (error) {
                        callback('error en la consulta: ' + error, null);
                    } else {


                        callback(null, { marcas: results });

                        connection.release();


                    }
                });
            }
        });



    }
}