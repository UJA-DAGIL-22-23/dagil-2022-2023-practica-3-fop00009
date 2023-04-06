/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Plantilla Home"
const TITULO_ACERCA_DE = "Plantilla Acerca de"

const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}


// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar

describe("Plantilla.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Plantilla.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Plantilla.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Plantilla.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Plantilla.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Plantilla.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Plantilla.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Plantilla.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})

describe("Plantilla.cabeceraTablaNombres",function(){
    it("Tendría que devolver las etiquetas HTML para la cabecera de la tabla de listar personas.",
        function(){
            expect(Plantilla.cabeceraTablaNombres()).toBe('<table class="listado-proyectos"><thead><th>ID</th><th>Nombre</th><th>Apellidos</th></thead><tbody>');
        }
    );
});

describe("Plantilla.Pietabla", function () {
    it("Tendría que devolver las etiquetas HTML para el pie de tabla",
        function () {
            expect(Plantilla.pieTabla()).toBe("</tbody></table>");
        });
});

describe("Plantilla.cuerpoListarPersonas",function(){
    it("debería devolver una fila de tabla HTML con los datos de la persona proporcionada",
    function(){
        const personaPrueba = {ID: 1, nombre: 'Juan', apellidos: 'Pérez'};
        const fila = Plantilla.cuerpoListarPersonas({ data: personaPrueba });
        expect(fila).toBe('<tr><td>1</td><td>Juan</td><td>Pérez</td></tr>');
    });

    it("debería manejar correctamente los valores nulos",function () {
        const personaPrueba = { ID: null, nombre: 'Juan', apellidos: 'González' };
        const fila = Plantilla.cuerpoListarPersonas({ data: personaPrueba });
        expect(fila).toBe('<tr><td></td><td>Juan</td><td>González</td></tr>');
      });
});

describe("Plantilla.imprime", function(){
    it("Deberia trabajar correctamente con vectores vacios", function(){
        const vector = [];
        const mensajeEsperado = Plantilla.cabeceraTablaNombres() + Plantilla.pieTabla();
        const mensaje = Plantilla.imprime(vector);
        expect(mensaje).toBe(mensajeEsperado); 
    });
    
    it('debería devolver un mensaje con una tabla HTML que muestre los datos de las personas proporcionadas', function() {
        const vector = [
          { ID: 1, nombre: 'Juan', apellidos: 'Pérez' },
          { ID: 2, nombre: 'Ana', apellidos: 'García' },
          { ID: 3, nombre: 'Pedro', apellidos: 'López' }
        ];
        const mensajeEsperado = '<table class="listado-proyectos"><thead><th>ID</th><th>Nombre</th><th>Apellidos</th></thead><tbody>' + 
          '<tr><td>1</td><td>Juan</td><td>Pérez</td></tr>' +
          '<tr><td>2</td><td>Ana</td><td>García</td></tr>' +
          '<tr><td>3</td><td>Pedro</td><td>López</td></tr>' +
          "</tbody></table>"
        const mensaje = Plantilla.cabeceraTablaNombres() + Plantilla.cuerpoListarPersonas({ data: vector[0] }) + 
        Plantilla.cuerpoListarPersonas({ data: vector[1] })+ Plantilla.cuerpoListarPersonas({ data: vector[2] })+Plantilla.pieTabla();
        expect(mensaje).toBe(mensajeEsperado);
      }); 
});

describe("Plantilla.imprimeNombreOrdenado", function(){
    it("Tendría que trabajar correctamente con vectores vacios", function(){
        const vector = [];
        const mensajeEsperado = Plantilla.cabeceraTablaNombres() + Plantilla.pieTabla();
        const mensaje = Plantilla.imprimeNombreOrdenado(vector);
        expect(mensaje).toBe(mensajeEsperado); 
    });
    it("Tendría que actualizar correctamente el titulo", function(){
        const vector = [];
        Plantilla.imprimeNombreOrdenado(vector);
        const tituloEsperado = "Listado de personas ordenado";
        expect(elementoTitulo.innerHTML).toEqual(tituloEsperado);
    });

    
});

describe("Plantilla.cabeceraTablaConTodo", function(){
    it("Tendría que devolver las etiquetas HTML para la cabecera de la tabla de listar personas con todos sus datos.", function(){
        expect(Plantilla.cabeceraTablaConTodo()).toBe('<table class="listado-proyectos"><thead><th>ID</th><th>Nombre</th><th>Apellidos</th><th>Altura (cm)</th><th>Nacimiento</th><th>Participaciones en JJOO</th><th>Podios conseguidos</th></thead><tbody>');
    });
});

describe("Plantilla.cuerpoListarConTodo",function(){
    it("debería devolver una fila de tabla HTML con los datos de la persona proporcionada",
    function(){
        const personaPrueba = {ID: 1, nombre: 'Juan', apellidos: 'Pérez', altura: '190', nacimiento: {dia: '1', mes: '1', año: '1', lugar: 'España'}, participacionesJJOO: '1', numPodiosConseguidos: '1'};
        const fila = Plantilla.cuerpoListarConTodo({ data: personaPrueba });
        expect(fila).toBe('<tr><td>1</td><td>Juan</td><td>Pérez</td><td>190</td><td>1/1/1 en España</td><td>1</td><td>1</td></tr>');
    });

    it("debería manejar correctamente los valores nulos e indefinidos",function () {
        let personaPrueba = {ID: 1, nombre: null, apellidos: 'Pérez', altura: '190', nacimiento: {dia: '1', mes: '1', año: '1', lugar: 'España'}, participacionesJJOO: '1', numPodiosConseguidos: '1'};
        let fila = Plantilla.cuerpoListarConTodo({ data: personaPrueba });
        expect(fila).toBe('<tr><td>1</td><td></td><td>Pérez</td><td>190</td><td>1/1/1 en España</td><td>1</td><td>1</td></tr>');
        
        personaPrueba = {ID: undefined, nombre: 'Juan', apellidos: 'Pérez', altura: '190', nacimiento: {dia: '1', mes: '1', año: '1', lugar: 'España'}, participacionesJJOO: '1', numPodiosConseguidos: '1'};
        fila = Plantilla.cuerpoListarConTodo({ data: personaPrueba });
        expect(fila).toBe('<tr><td></td><td>Juan</td><td>Pérez</td><td>190</td><td>1/1/1 en España</td><td>1</td><td>1</td></tr>');
    
        personaPrueba = {ID: 1, nombre: 'Juan', apellidos: undefined, altura: '190', nacimiento: {dia: '1', mes: '1', año: '1', lugar: 'España'}, participacionesJJOO: '1', numPodiosConseguidos: '1'};
        fila = Plantilla.cuerpoListarConTodo({ data: personaPrueba });
        expect(fila).toBe('<tr><td>1</td><td>Juan</td><td></td><td>190</td><td>1/1/1 en España</td><td>1</td><td>1</td></tr>');
    
        personaPrueba = {ID: 1, nombre: 'Juan', apellidos: 'Pérez', altura: null, nacimiento: {dia: '1', mes: '1', año: '1', lugar: 'España'}, participacionesJJOO: '1', numPodiosConseguidos: '1'};
        fila = Plantilla.cuerpoListarConTodo({ data: personaPrueba });
        expect(fila).toBe('<tr><td>1</td><td>Juan</td><td>Pérez</td><td></td><td>1/1/1 en España</td><td>1</td><td>1</td></tr>');
    
        personaPrueba = {ID: 1, nombre: 'Juan', apellidos: 'Pérez', altura: '190', nacimiento: undefined, participacionesJJOO: '1', numPodiosConseguidos: '1'};
        fila = Plantilla.cuerpoListarConTodo({ data: personaPrueba });
        expect(fila).toBe('<tr><td>1</td><td>Juan</td><td>Pérez</td><td>190</td><td></td><td>1</td><td>1</td></tr>');
    
        personaPrueba = {ID: 1, nombre: 'Juan', apellidos: 'Pérez', altura: '190', nacimiento: {dia: '1', mes: '1', año: '1', lugar: 'España'}, participacionesJJOO: null, numPodiosConseguidos: '1'};
        fila = Plantilla.cuerpoListarConTodo({ data: personaPrueba });
        expect(fila).toBe('<tr><td>1</td><td>Juan</td><td>Pérez</td><td>190</td><td>1/1/1 en España</td><td></td><td>1</td></tr>');
    
        personaPrueba = {ID: 1, nombre: 'Juan', apellidos: 'Pérez', altura: '190', nacimiento: {dia: '1', mes: '1', año: '1', lugar: 'España'}, participacionesJJOO: '1', numPodiosConseguidos: undefined};
        fila = Plantilla.cuerpoListarConTodo({ data: personaPrueba });
        expect(fila).toBe('<tr><td>1</td><td>Juan</td><td>Pérez</td><td>190</td><td>1/1/1 en España</td><td>1</td><td></td></tr>');
        
    });
});

describe("Plantilla.imprimeConTodo", function(){
    it("Tendría que trabajar correctamente con vectores vacios", function(){
        const vector = [];
        const mensajeEsperado = Plantilla.cabeceraTablaConTodo() + Plantilla.pieTabla();
        const mensaje = Plantilla.imprimeConTodo(vector);
        expect(mensaje).toBe(mensajeEsperado); 
    });
    it("Tendría que actualizar correctamente el titulo", function(){
        const vector = [];
        Plantilla.imprimeConTodo(vector);
        const tituloEsperado = "Listado de personas con todo";
        expect(elementoTitulo.innerHTML).toEqual(tituloEsperado);
    }); 
    it('debería devolver un mensaje con una tabla HTML que muestre los datos de las personas proporcionadas', function() {
        const personas = [
            {
              ID: 1,
              nombre: 'Juan',
              apellidos: 'Pérez',
              altura: '190',
              nacimiento: {dia: '1', mes: '1', año: '1', lugar: 'España'},
              participacionesJJOO: '1',
              numPodiosConseguidos: '1'
            },
            {
              ID: 2,
              nombre: 'María',
              apellidos: 'García',
              altura: '165',
              nacimiento: {dia: '10', mes: '5', año: '1990', lugar: 'México'},
              participacionesJJOO: '2',
              numPodiosConseguidos: '3'
            },
            {
              ID: 3,
              nombre: 'Pedro',
              apellidos: 'Rodríguez',
              altura: '180',
              nacimiento: {dia: '15', mes: '3', año: '1985', lugar: 'Argentina'},
              participacionesJJOO: '3',
              numPodiosConseguidos: '2'
            }
          ];
        let mensajeEsperado =  Plantilla.cabeceraTablaConTodo()
        personas.forEach(persona => {
            const fila = `<tr><td>${persona.ID}</td><td>${persona.nombre}</td><td>${persona.apellidos}</td><td>${persona.altura}</td><td>${persona.nacimiento.dia}/${persona.nacimiento.mes}/${persona.nacimiento.año} en ${persona.nacimiento.lugar}</td><td>${persona.participacionesJJOO}</td><td>${persona.numPodiosConseguidos}</td></tr>`;
            mensajeEsperado = mensajeEsperado + fila;
        });
            mensajeEsperado=mensajeEsperado+Plantilla.pieTabla();
        const mensaje = Plantilla.cabeceraTablaConTodo() + Plantilla.cuerpoListarConTodo({ data: personas[0] }) + 
        Plantilla.cuerpoListarConTodo({ data: personas[1] })+ Plantilla.cuerpoListarConTodo({ data: personas[2] })+Plantilla.pieTabla();
        expect(mensaje).toBe(mensajeEsperado);
      }); 

      
    
});

describe("Plantilla.nuevoOrden", function() {

    beforeEach(function() {
      vDatos = [
        { data: { ID: 3, nombre: "Juan", apellidos: "Pérez", altura: 170, numPodiosConseguidos: 5 } },
        { data: { ID: 2, nombre: "Ana", apellidos: "García", altura: 165, numPodiosConseguidos: 3 } },
        { data: { ID: 1, nombre: "Pedro", apellidos: "López", altura: 180, numPodiosConseguidos: 2 } },
      ];
      tipoOrden = 0;
    });
    it("debe ordenar los datos por ID", function() {
      Plantilla.nuevoOrden();
      expect(vDatos[0].data.ID).toEqual(1);
      expect(vDatos[1].data.ID).toEqual(2);
      expect(vDatos[2].data.ID).toEqual(3);
    });
  
    it("debe ordenar los datos por Nombre", function() {
      tipoOrden = 1; // Simula un click en el botón 
      Plantilla.nuevoOrden();
      expect(vDatos[0].data.nombre).toEqual("Ana");
      expect(vDatos[1].data.nombre).toEqual("Juan");
      expect(vDatos[2].data.nombre).toEqual("Pedro");
    });
  
    it("debe ordenar los datos por Apellidos", function() {
      tipoOrden = 2; // Simula un click en el botón 
      Plantilla.nuevoOrden();
      expect(vDatos[0].data.apellidos).toEqual("García");
      expect(vDatos[1].data.apellidos).toEqual("López");
      expect(vDatos[2].data.apellidos).toEqual("Pérez");
    });
  
    it("debe ordenar los datos por Altura", function() {
      tipoOrden = 3; // Simula un click en el botón 
      Plantilla.nuevoOrden();
      expect(vDatos[0].data.altura).toEqual(165);
      expect(vDatos[1].data.altura).toEqual(170);
      expect(vDatos[2].data.altura).toEqual(180);
    });
  
    it("debe ordenar los datos por Número de podios conseguidos", function() {
      tipoOrden = 4; // Simula un click en el botón 
      Plantilla.nuevoOrden();
      expect(vDatos[0].data.numPodiosConseguidos).toEqual(2);
      expect(vDatos[1].data.numPodiosConseguidos).toEqual(3);
      expect(vDatos[2].data.numPodiosConseguidos).toEqual(5);
    });
  
  }); 

  
  
describe("Plantilla.creaBoton", function(){
    it("Tendría que devolver las etiquetas HTML para el botón y saber en que orden se encuentra en ese momento.", function(){
        const tipoOrdenes = ['ID', 'Nombre', 'Apellidos', 'Altura', 'Número de podios conseguidos'];
        expect(Plantilla.creaBoton()).toContain('<button class="miBoton" onclick="Plantilla.nuevoOrden()">Cambiar orden</button>');
        expect(Plantilla.creaBoton()).toContain(`<a class="subtitulo">Ordenado por ${tipoOrdenes[tipoOrden % 5]}</a>`);
        
    });
});

describe("Plantilla.imprimeConBoton", function(){
    it("Tendría que trabajar correctamente con vectores vacios", function(){
        const vector = [];
        const mensajeEsperado = Plantilla.creaBoton()+Plantilla.cabeceraTablaConTodo() + Plantilla.pieTabla();
        const mensaje = Plantilla.imprimeConBoton(vector);
        expect(mensaje).toBe(mensajeEsperado); 
    });
    it("Tendría que actualizar correctamente el titulo", function(){
        const vector = [];
        Plantilla.imprimeConBoton(vector);
        const tituloEsperado = "Listado de personas con diferente orden";
        expect(elementoTitulo.innerHTML).toEqual(tituloEsperado);
    });
    
});






/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Plantilla.descargarRuta
 - Plantilla.procesarAcercaDe
 - Plantilla.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
