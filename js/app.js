//variables
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const precioMin = document.querySelector("#minimo");
const precioMaximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

//contenedor para los resultados
const resultado = document.querySelector("#resultado");

const max = new Date().getFullYear(); // me coge el año actual
const min = max - 10; // este sera el año minimo que puedo filtrar

//generar datos busquedad
const datosBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

//eventos

document.addEventListener("DOMContentLoaded", () => {
  //apenas cargue nuestra pagina mandamos a llamar una funcion que nos
  //mostrara todos los autos disponibles en nuestra base de datos simulada
  mostrarAutos(autos);

  //llena las opciones de años
  llenarSelect();
});

//event listener
marca.addEventListener("change", (e) => {
  datosBusqueda.marca = e.target.value;

  filtrarAuto();
});
year.addEventListener("change", (e) => {
  datosBusqueda.year = e.target.value;

  filtrarAuto();
});
precioMin.addEventListener("change", (e) => {
  datosBusqueda.minimo = e.target.value;
  filtrarAuto();
});
precioMaximo.addEventListener("change", (e) => {
  datosBusqueda.maximo = e.target.value;
  filtrarAuto();
});
puertas.addEventListener("change", (e) => {
  datosBusqueda.puertas = e.target.value;
});
transmision.addEventListener("change", (e) => {
  datosBusqueda.transmision = e.target.value;
});
color.addEventListener("change", (e) => {
  datosBusqueda.color = e.target.value;
});

//funciones

function mostrarAutos(autos) {
  //elimina el HTML previo
  limpiarHTML();

  //iteramos sobre autos que es un objetos que tenemos en otro documento .js
  autos.forEach((auto) => {
    //destructuring
    const { marca, modelo, year, precio, puertas, color, transmision } = auto;
    //creamos el html por cada auto que itere
    const autoHTML = document.createElement("p");
    //le agregamos el contenido que sera un template string para que los
    //enumere tal y como estan en nuestro objeto autos
    autoHTML.textContent = `
    ${marca} -
    ${modelo} -
    ${year} -
    Precio:${precio}$ -
    ${puertas}Puertas -
    Color: ${color} -
    Transmision:${transmision}
     `;

    //los insertamos en un div que esta debajo del titulo resultados
    resultado.appendChild(autoHTML);
  });
}

//limpiar html
function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function llenarSelect() {
  for (let i = max; i >= min; i--) {
    const opcion = document.createElement("option"); // la etiqueta select tiene como subetiquetas "options"
    opcion.value = i;
    opcion.textContent = i;

    year.appendChild(opcion);
  }
}

//funcion para filtrar en base a la busqueda
function filtrarAuto() {
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo);
  console.log(resultado);

  mostrarAutos(resultado);
}

function filtrarMarca(auto) {
  if (datosBusqueda.marca) {
    return auto.marca === datosBusqueda.marca;
  }
  return auto;
}
function filtrarYear(auto) {
  if (datosBusqueda.year) {
    return auto.year === parseInt(datosBusqueda.year); // me transforma a numero para la comparacion
  }
  return auto;
}
function filtrarMinimo(auto) {
  if (datosBusqueda.minimo) {
    return auto.precio >= parseInt(datosBusqueda.minimo); // me transforma a numero para la comparacion
  }
  return auto;
}
function filtrarMaximo(auto) {
  if (datosBusqueda.maximo) {
    return auto.precio <= parseInt(datosBusqueda.maximo); // me transforma a numero para la comparacion
  }
  return auto;
}
