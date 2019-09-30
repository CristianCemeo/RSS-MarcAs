
var div = document.getElementById("noticias");
var ajax;
var equipo;     //Variable que utilizaremos para saber el equipo que pulsamos
var diasFechaEng = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
var diasFechaSpa = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
var mesesEng = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var mesesSpa = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

var botones = document.querySelector(".botones");
botones.addEventListener("click", function (evento) {
    saberEquipo(evento);
}, false);

function imprimirNoticias(equipo) {
    ajax.send("equipo=" + equipo);
    ajax.addEventListener("load", function () {
        div.textContent = "";
        
        //Parseamos el documento en formato text a xml
        parsear = new DOMParser();
        xmlDoc = parsear.parseFromString(ajax.responseText, "text/xml");

        //Creamos el título h1
        var nameTitle = "Sección Primera División de la Liga Española - LaLiga | Fútbol | Diario AS";
        var h1 = document.createElement("h1");
        if (xmlDoc.getElementsByTagName("title")[0].textContent == nameTitle){
            h1.textContent = "Últimas noticias | AS";
        } else {
            h1.textContent = xmlDoc.getElementsByTagName("title")[0].textContent;
        }
        div.appendChild(h1);

        //Cogemos las noticias y las recorremos
        var noticias = xmlDoc.getElementsByTagName("item");
        for (const noticia of noticias) {
            var fieldset = document.createElement("fieldset");
            div.appendChild(fieldset);

            //Cambiamos la fecha de inglés a español y le damos formato
            var fechaEng = noticia.getElementsByTagName("pubDate")[0].textContent;
            if (fechaEng.length == 30) {
                var diaSem = fechaEng.substring(0, 3);
                diaSem = diasFechaSpa[diasFechaEng.indexOf(diaSem)];
                var diaMes = fechaEng.substring(5, 6);
                var mes = fechaEng.substring(7, 10);
                mes = mesesSpa[mesesEng.indexOf(mes)];
                var year = fechaEng.substring(11, 15);
                var time = fechaEng.substring(16, 24);
            } else {
                var diaSem = fechaEng.substring(0, 3);
                diaSem = diasFechaSpa[diasFechaEng.indexOf(diaSem)];
                var diaMes = fechaEng.substring(5, 7);
                var mes = fechaEng.substring(8, 11);
                mes = mesesSpa[mesesEng.indexOf(mes)];
                var year = fechaEng.substring(12, 16);
                var time = fechaEng.substring(17, 25);
            }

            var fechaSpa = diaSem + ", " + diaMes + " " + mes + " " + year + " " + time;

            // Creamos un elemento legend y le introducimos la fecha
            var legend = document.createElement("legend");
            legend.textContent = fechaSpa;
            fieldset.appendChild(legend);

            // Comprobamos si la noticia tiene imagen, si es asi creamos el elemento img
            if (noticia.getElementsByTagName("enclosure")[0] != null) {
                var img = document.createElement("img");
                img.setAttribute("src", noticia.getElementsByTagName("enclosure")[0].getAttribute("url"));
                img.setAttribute("alt", noticia.getElementsByTagName("title")[0].textContent);
                fieldset.appendChild(img);
            }

            var h2 = document.createElement("h2");
            var p = document.createElement("p");
            var br = document.createElement("br");
            var boton = document.createElement("button");
            var a = document.createElement("a");
            var hr = document.createElement("hr");

            h2.textContent = noticia.getElementsByTagName("title")[0].textContent;
            p.textContent = noticia.getElementsByTagName("description")[0].textContent;
            boton.setAttribute("id", "leerNoticia");
            boton.textContent = "Leer noticia";
            a.setAttribute("target", "_blank");
            a.setAttribute("href", noticia.getElementsByTagName("link")[0].textContent);

            fieldset.appendChild(h2);
            fieldset.appendChild(hr);
            fieldset.appendChild(p);
            fieldset.appendChild(a);
            a.appendChild(boton);
            div.appendChild(br);

        }
    });

}

function ajaxProgress() {
    ajax.addEventListener("progress", function () {
        var imgCarga = document.createElement("img");
        imgCarga.setAttribute("src", "../images/cargando.gif");
        div.appendChild(imgCarga);
    });
}

function ajaxError() {
    ajax.addEventListener("error", function () {
        var imgError = document.createElement("img");
        imgError.setAttribute("src", "../images/error.png");
        imgError.setAttribute("width", "100px");
        div.appendChild(imgCarga);
        div.textContent = "Error al cargar la página (" + ajax.status + ")";
    });
}

function saberEquipo(evento) {
    //Quitamos el color del borde y el fondo del botón seleccionado (si hemos pulsado anteriormente)
    if (equipo != null) {
        document.getElementById(equipo).style.borderColor = "gray";
        document.getElementById(equipo).style.backgroundColor = "black";
    }

    //Cogemos el nombre id del boton que hemos pulsado
    equipo = evento.path[1].id;

    //Cambiamos el color del borde y el fondo del botón seleccionado
    document.getElementById(equipo).style.borderColor = "red";
    document.getElementById(equipo).style.backgroundColor = "rgb(39, 39, 39)";

    if (equipo == "volver-index"){
        window.location.href = "https://rss-marcas.000webhostapp.com/";
    } else {
        ajax = new XMLHttpRequest();
        ajax.open("POST", "https://rss-marcas.000webhostapp.com/equipos/as/equiposAs.php");
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajaxProgress();
        ajaxError();
        imprimirNoticias(equipo);
    }

}
