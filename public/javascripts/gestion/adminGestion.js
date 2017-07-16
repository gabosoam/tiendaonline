
var socket = io.connect();



function cargarModelos() {
    socket.emit('Cargar modelos', function (error, datos) {


        if (error) {
            alert('Existio un error');
        } else {
            if (datos.modelos.length > 0) {
                w3.displayObject("tablaModelos", datos);

            }
        }

    });
}

function cargarCategorias() {
    socket.emit('Cargar categorias', function (error, datos) {

        if (error) {
            alert('Existio un error');
        } else {
            if (datos.categorias.length > 0) {
                w3.displayObject("fkCategoria", datos);

            }
        }

    });
}

function cargarMarcas() {
    
    socket.emit('Cargar marcas', function (error, datos) {

        if (error) {
            alert('Existio un error');
        } else {
            if (datos.marcas.length > 0) {
                w3.displayObject("fkMarca", datos);

            }
        }

    });
}





window.addEventListener("load", function (event) {
    cargarModelos();
    cargarCategorias();
    cargarMarcas();

});