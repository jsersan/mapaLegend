let mapa;
let tipo = "";
let markers = [];

let emoticon; // modificado 20/04
let legend = null;
legend = document.getElementById("legend");
let inicio = false;

window.onload = function() {
    console.log("Cargando mapa....");
    initMap();

    console.log("Colocando leyenda....");
    colocarLeyenda();

    var valores = getGET();
    if (valores) {
        //recogemos los valores que nos envia la URL en variables para trabajar con ellas
        //tipo es el parámetro que pasamos por get
        var tipo = valores['tipo'];
    }
    cargarDatos(tipo);
}


function getGET() {
    // Función para capturar parámetros por la url
    // capturamos la url
    var loc = document.location.href;

    // si existe el interrogante
    if (loc.indexOf("?") > 0) {
        // cogemos la parte de la url que hay despues del interrogante
        var getString = loc.split("?")[1];

        // obtenemos un array con cada clave=valor
        var GET = getString.split("&");
        var get = {};

        // recorremos todo el array de valores
        for (var i = 0, l = GET.length; i < l; i++) {
            var tmp = GET[i].split("=");
            get[tmp[0]] = unescape(decodeURI(tmp[1]));
        }
        return get;
    }
}

function initMap() {
    const LatLong = {
        lat: 43.2603479,
        lng: -2.933411
    };
    console.log(LatLong);

    this.mapa = new google.maps.Map(document.getElementById("mapa"), {
        center: LatLong,
        zoom: 9
    });

    return;
}

function colocarLeyenda() {

    // Tomamos las imágenes de la web de google

    var iconBase = "https://maps.google.com/mapfiles/kml/shapes/";
    var icons = {
        capital: {
            name: "capital",
            icon: iconBase + "capital_big_highlight.png"
        },
        museos: {
            name: "museos",
            icon: iconBase + "museum_maps.png"
        },
        aeropuerto: {
            name: "aeropuerto",
            icon: iconBase + "airports_maps.png"
        },
        restaurante: {
            name: "restaurante",
            icon: iconBase + "dining_maps.png"
        },
        topturismo: {
            name: "topturismo",
            icon: iconBase + "camera_maps.png"
        }
    };

    // Usamos la variable inicio ya que sólo ponemos la leyenda una vez

    if (!inicio) {
        for (var key in icons) {
            var type = icons[key];
            var name = type.name;
            var icon = type.icon;

            // Creo un nuevo div para la leyenda

            var div = document.createElement("div");
            div.setAttribute("id", "leyenda");

            // Asocio una url distinta dependiendo del elemento elegido
            var enlace =
                '<a href="' +
                "index.html?tipo=" +
                name +
                '"><img src="' +
                icon +
                '">' +
                name +
                "</a>";
            div.innerHTML = enlace;

            legend.appendChild(div);
        }

        inicio = true;
    }
    // Agrego la leyenda al mapa

    this.mapa.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);

    return;
}

function cargarDatos(tipo) {
    // En función  del tipo muestro el mensaje asociado
    switch (tipo) {
        case "restaurante":
            console.log("Restaurante");
            break;

        case "aeropuerto":
            console.log("Aeropuerto");
            break;

        case "museos":
            console.log("museos");
            break;

        case "topturismo":
            console.log("turismo");
            break;

        case "capital":
            console.log("capital");
            break;
    }
}