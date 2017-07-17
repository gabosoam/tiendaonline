
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
                w3.hide('#listaModelos');
                document.getElementById('resultado').textContent = 'No se encontraron resultados para categoría: '+categoria;
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
                w3.hide('#listaModelos');
                document.getElementById('resultado').textContent = 'No se encontraron resultados para la busqueda: '+termino;
            }
            else {
                document.getElementById('resultado').textContent = 'Coincidencias: ' + datos.modelos.length;
                w3.displayObject('listaModelos', datos);
            }
        }


    });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {

    }
}


function showPosition(position) {


    var mymap = L.map('mapid').setView([position.coords.latitude, position.coords.longitude], 15);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);

  

    L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap)
        .bindPopup("<b>Tu ubicación</b><br />").openPopup();




    var popup = L.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(mymap);
    }

    mymap.on('click', onMapClick);
}

window.addEventListener("load", function (event) {

    cargarCategorias();
    cargarModelos();
   // iniciarMapa();

   getLocation();
});