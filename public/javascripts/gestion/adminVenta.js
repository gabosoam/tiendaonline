
var socket = io.connect();



function cargarVentas() {

    socket.emit('Cargar ventas', function (error, datos) {
        if (error) {
            alert('Existio un error');
        } else {
            if (datos.ventas.length > 0) {
                w3.displayObject("tablaVentas", datos);

            }
        }

    });
}

function cargarVentasRealizadas() {

    socket.emit('Cargar ventas realizadas', function (error, datos) {
        if (error) {
            alert('Existio un error');
        } else {
            if (datos.ventas.length > 0) {
                w3.displayObject("tablaVentasRealizadas", datos);

            }
        }

    });
}




window.addEventListener("load", function (event) {
    cargarVentas();
    cargarVentasRealizadas();

});