/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};

var tipoOrden = 1;

var vDatos;

var vecesMostrado = 0;
// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}

Plantilla.plantillaTags = {
    "ID": "### ID ###",
    "nombre": "### nombre ###",
    "apellidos": "### apellidos ###",
    "altura": "### altura ###",
    "dia": "### dia ###",
    "mes": "### mes ###",
    "año": "### año ###",
    "lugar": "### lugar ###",
    "participacionesJJOO": "### participacionesJJOO ###",
    "numPodiosConseguidos": "### numPodiosConseguidos ###",
}


/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}


/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Plantilla.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Plantilla.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Plantilla.procesarHome = function () {
    this.descargarRuta("/plantilla/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Plantilla.procesarAcercaDe = function () {
    this.descargarRuta("/plantilla/acercade", this.mostrarAcercaDe);
}

/**
 * Función principal para responder al evento de elegir la opción "Listar nombres personas"
 */
Plantilla.procesarListarNombres = function () {
    this.recupera(this.imprime);
}


/**
 * Función principal para responder al evento de elegir la opción "Listar todos los datos de las personas"
 */
Plantilla.procesarPersonasConTodo = function () {
    this.recupera(this.imprimeConTodo);
}

/**
 * Función principal para responder al evento de elegir la opción "Listar todos los datos de las personas ordenado de diferentes"
 */

Plantilla.cambiarOrden = function (){
   this.recupera(this.imprimeConBoton)
}

Plantilla.creaBoton = function(){
    let num = (tipoOrden%5);
    if(num == 0 ||vecesMostrado == 0){
        vecesMostrado++;
        return `<div class="contenedor"><button class="miBoton" onclick="Plantilla.nuevoOrden()">Cambiar orden</button></div><a class="subtitulo">Ordenado por ID</a><br></br>`
    }
    if(num == 1){
        vecesMostrado++;
        return `<div class="contenedor"><button class="miBoton" onclick="Plantilla.nuevoOrden()">Cambiar orden</button></div><a class="subtitulo">Ordenado por Nombre</a><br></br>`
    }
    if(num == 2){
        vecesMostrado++;
        return `<div class="contenedor"><button class="miBoton" onclick="Plantilla.nuevoOrden()">Cambiar orden</button></div><a class="subtitulo">Ordenado por Apellidos</a><br></br>`
    }
    if(num == 3){
        vecesMostrado++;
        return `<div class="contenedor"><button class="miBoton" onclick="Plantilla.nuevoOrden()">Cambiar orden</button></div><a class="subtitulo">Ordenado por Altura</a><br></br>`
    }
    if(num == 4){
        vecesMostrado++;
        return `<div class="contenedor"><button class="miBoton" onclick="Plantilla.nuevoOrden()">Cambiar orden</button></div><a class="subtitulo" >Ordenado por Número de podios conseguidos</a><br></br>`
    }
}

Plantilla.nuevoOrden = function(){
    if(tipoOrden%5==0){
        vDatos.sort(function(a, b){
            let id1 = a.data.ID
            let id2 = b.data.ID
            if (id1 < id2) {
                return -1;
            }
            if (id1 > id2) {
                return 1;
            }
            return 0;
        });
        Plantilla.imprimeConBoton(vDatos);
    }
    if(tipoOrden%5==1){
        vDatos.sort(function(a, b){
            let nombre1 = a.data.nombre.toUpperCase();
            let nombre2 = b.data.nombre.toUpperCase();
            if (nombre1 < nombre2) {
                return -1;
            }
            if (nombre1 > nombre2) {
                return 1;
            }
            return 0;
        });
        Plantilla.imprimeConBoton(vDatos);
    }
    if(tipoOrden%5==2){
        vDatos.sort(function(a, b){
            let apellido1 = a.data.apellidos.toUpperCase();
            let apellido2 = b.data.apellidos.toUpperCase();
            if (apellido1 < apellido2) {
                return -1;
            }
            if (apellido1 > apellido2) {
                return 1;
            }
            return 0;
        });
        Plantilla.imprimeConBoton(vDatos);
    }
    if(tipoOrden%5==3){
        vDatos.sort(function(a, b){
            let altura1 = a.data.altura;
            let altura2 = b.data.altura;
            if (altura1 < altura2) {
                return -1;
            }
            if (altura1 > altura2) {
                return 1;
            }
            return 0;
        });
        Plantilla.imprimeConBoton(vDatos);
    }
    if(tipoOrden%5==4){
        vDatos.sort(function(a, b){
            let pConseguidos1 = a.data.numPodiosConseguidos;
            let pConseguidos2 = b.data.numPodiosConseguidos;
            if (pConseguidos1 < pConseguidos2) {
                return -1;
            }
            if (pConseguidos1 > pConseguidos2) {
                return 1;
            }
            return 0;
        });
        Plantilla.imprimeConBoton(vDatos);
    }
    tipoOrden++;
    
}

Plantilla.imprimeConBoton = function(vector){
    let mensaje = "";
    vDatos = vector;
    mensaje+=Plantilla.creaBoton();
    mensaje += Plantilla.cabeceraTablaConTodo();
    vector.forEach(e => mensaje+= Plantilla.cuerpoListarConTodo(e));
    mensaje += Plantilla.pieTabla();
    Frontend.Article.actualizar("Listado de personas con diferente orden", mensaje);
    return mensaje;
}


Plantilla.imprimeConTodo = function(vector){
    let mensaje = "";
    mensaje += Plantilla.cabeceraTablaConTodo();
    vector.forEach(e => mensaje+= Plantilla.cuerpoListarConTodo(e));
    mensaje += Plantilla.pieTabla();
    Frontend.Article.actualizar("Listado de personas con todo", mensaje);
    return mensaje;
}

Plantilla.cuerpoListarConTodo = function (p) {
    const persona = p.data
     
    if (persona.ID === null || persona.ID === undefined) {
        return `<tr><td></td><td>${persona.nombre}</td><td>${persona.apellidos}</td><td>${persona.altura}</td><td>${persona.nacimiento.dia}/${persona.nacimiento.mes}/${persona.nacimiento.año} en ${persona.nacimiento.lugar}</td><td>${persona.participacionesJJOO}</td><td>${persona.numPodiosConseguidos}</td></tr>`;
    }
    if (persona.apellidos === null || persona.apellidos === undefined) {
        return `<tr><td>${persona.ID}</td><td>${persona.nombre}</td><td></td><td>${persona.altura}</td><td>${persona.nacimiento.dia}/${persona.nacimiento.mes}/${persona.nacimiento.año} en ${persona.nacimiento.lugar}</td><td>${persona.participacionesJJOO}</td><td>${persona.numPodiosConseguidos}</td></tr>`;
    }
    if (persona.nombre === null || persona.nombre === undefined) {
        return `<tr><td>${persona.ID}</td><td></td><td>${persona.apellidos}</td><td>${persona.altura}</td><td>${persona.nacimiento.dia}/${persona.nacimiento.mes}/${persona.nacimiento.año} en ${persona.nacimiento.lugar}</td><td>${persona.participacionesJJOO}</td><td>${persona.numPodiosConseguidos}</td></tr>`;
    }
    if (persona.altura === null || persona.altura === undefined) {
        return `<tr><td>${persona.ID}</td><td>${persona.nombre}</td><td>${persona.apellidos}</td><td></td><td>${persona.nacimiento.dia}/${persona.nacimiento.mes}/${persona.nacimiento.año} en ${persona.nacimiento.lugar}</td><td>${persona.participacionesJJOO}</td><td>${persona.numPodiosConseguidos}</td></tr>`;
    }
    if (persona.nacimiento === null || persona.nacimiento === undefined) {
        return `<tr><td>${persona.ID}</td><td>${persona.nombre}</td><td>${persona.apellidos}</td><td>${persona.altura}</td><td></td><td>${persona.participacionesJJOO}</td><td>${persona.numPodiosConseguidos}</td></tr>`;
    }
    if (persona.participacionesJJOO === null || persona.participacionesJJOO === undefined) {
        return `<tr><td>${persona.ID}</td><td>${persona.nombre}</td><td>${persona.apellidos}</td><td>${persona.altura}</td><td>${persona.nacimiento.dia}/${persona.nacimiento.mes}/${persona.nacimiento.año} en ${persona.nacimiento.lugar}</td><td></td><td>${persona.numPodiosConseguidos}</td></tr>`;
    } 
    if (persona.numPodiosConseguidos === null || persona.numPodiosConseguidos === undefined) {
        return `<tr><td>${persona.ID}</td><td>${persona.nombre}</td><td>${persona.apellidos}</td><td>${persona.altura}</td><td>${persona.nacimiento.dia}/${persona.nacimiento.mes}/${persona.nacimiento.año} en ${persona.nacimiento.lugar}</td><td>${persona.participacionesJJOO}</td><td></td></tr>`;
    }
    
    return `<tr><td>${persona.ID}</td><td>${persona.nombre}</td><td>${persona.apellidos}</td><td>${persona.altura}</td><td>${persona.nacimiento.dia}/${persona.nacimiento.mes}/${persona.nacimiento.año} en ${persona.nacimiento.lugar}</td><td>${persona.participacionesJJOO}</td><td>${persona.numPodiosConseguidos}</td></tr>`;
}

Plantilla.cabeceraTablaConTodo = function () {
    return `<table class="listado-proyectos"><thead><th>ID</th><th>Nombre</th><th>Apellidos</th><th>Altura (cm)</th><th>Nacimiento</th><th>Participaciones en JJOO</th><th>Podios conseguidos</th></thead><tbody>`;
}
Plantilla.imprime = function (vector) {
    let mensaje = "";
    mensaje += Plantilla.cabeceraTablaNombres();
    vector.forEach(e => mensaje+= Plantilla.cuerpoListarPersonas(e))
    mensaje += Plantilla.pieTabla();
    
    Frontend.Article.actualizar("Listado de personas", mensaje);
    return mensaje
}

Plantilla.cabeceraTablaNombres = function () {
    return `<table class="listado-proyectos"><thead><th>ID</th><th>Nombre</th><th>Apellidos</th></thead><tbody>`;
}

Plantilla.cuerpoListarPersonas = function (p) {
    const d = p.data
    

    if(d.ID == null && d.apellidos == null && d.nombre == null){
        return `<tr><td></td><td>${d.nombre}</td><td></td></tr>`
    }
    if(d.ID == null && d.apellidos == null){
        return `<tr><td></td><td>${d.nombre}</td><td></td></tr>`;

    }
    if(d.ID == null && d.nombre == null){
        return `<tr><td></td><td></td><td>${d.apellidos}</td></tr>`;
    }
    if(d.nombre == null && d.apellidos == null){
        return `<tr><td>${d.ID}</td><td></td><td></td></tr>`;
    }
    if(d.ID == null){
        return `<tr><td></td><td>${d.nombre}</td><td>${d.apellidos}</td></tr>`;
    }
    if(d.apellidos == null){
        return `<tr><td>${d.ID}</td><td>${d.nombre}</td><td></td></tr>`;
    }
    if(d.nombre == null){
        return `<tr><td>${d.ID}</td><td></td><td>${d.apellidos}</td></tr>`;
    }
    
    return `<tr><td>${d.ID}</td><td>${d.nombre}</td><td>${d.apellidos}</td></tr>`;
}

Plantilla.pieTabla = function () {
    return "</tbody></table>";
}


Plantilla.recupera = async function (callBackFn) {
    let respuesta = null
    try{
        const url = Frontend.API_GATEWAY + "/plantilla/listarnPersonas"
        respuesta = await fetch(url)
    }catch (error){
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }

    let vectorPersonas = null
    if(respuesta){
        vectorPersonas = await respuesta.json()
        callBackFn(vectorPersonas.data)
    }
}


/**
 * Función principal para responder al evento de elegir la opción "Listar nombres personas en orden"
 */
Plantilla.procesarListarNombresOrden = function () {
    this.recupera(this.imprimeNombreOrdenado);
}


Plantilla.ordenarPorApellido = function (vector) {
    vector.sort(function(a, b){
        let apellido1 = a.data.apellidos.toUpperCase();
        let apellido2 = b.data.apellidos.toUpperCase();
        if (apellido1 < apellido2) {
            return -1;
        }
        if (apellido1 > apellido2) {
            return 1;
        }
        return 0;
    });
}

Plantilla.imprimeNombreOrdenado = function (vector) {
    Plantilla.ordenarPorApellido(vector); 
    let mensaje = "";
    mensaje += Plantilla.cabeceraTablaNombres();
    vector.forEach(e => mensaje+= Plantilla.cuerpoListarPersonas(e))
    mensaje += Plantilla.pieTabla();

    Frontend.Article.actualizar("Listado de personas ordenado", mensaje);
    return mensaje;
}



