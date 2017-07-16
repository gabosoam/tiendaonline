
var socket = io.connect();

function cargarCategorias() {
    socket.emit('Cargar categorias', function (error, datos) {

        if (error) {
            alert('Existio un error');
        } else {
            if (datos.categorias.length > 0) {
                w3.displayObject("listaCategorias", datos);

            }
        }

    });
}

function cargarModelos() {
    socket.emit('Cargar modelos', function (error, datos) {


        if (error) {
            alert('Existio un error');
        } else {
            if (datos.modelos.length > 0) {
                w3.displayObject("listaModelos", datos);

            }
        }

    });
}

function cargarPorCategoria(categoria) {


    socket.emit('Cargar por categoria', categoria, function (error, datos) {

        if (error) {

        } else {
            if (datos.modelos.length == 0) {
                document.getElementById('resultado').textContent = 'No se encontraron resultados';
            }
            else {
                document.getElementById('resultado').textContent = 'Coincidencias: ' + datos.modelos.length;
                w3.displayObject('listaModelos', datos);
            }
        }

    });
}

function cargarPorTermino(termino) {

    socket.emit('Cargar por termino', termino, function (error, datos) {
        if (error) {

        } else {
            if (datos.modelos.length == 0) {
                document.getElementById('resultado').textContent = 'No se encontraron resultados';
            }
            else {
                document.getElementById('resultado').textContent = 'Coincidencias: ' + datos.modelos.length;
                w3.displayObject('listaModelos', datos);
            }
        }


    });
}

window.addEventListener("load", function (event) {

    cargarCategorias();
    cargarModelos();
});