// Constructor para los objetos
class turno {
    constructor(abogado, cliente, horario) {
        this.abogado = abogado;
        this.cliente = cliente.toUpperCase();
        this.horario = horario.toString();
    }
}

// Declaración de variables
let pagina = document.title;
let tiempoEspA = 0;
let tiempoEspB = 0;
let menorTiempo = 0;
let consultas = localStorage.length;
let formulario = document.getElementById("formulario");
let consultasHoy = 1;
let abogado = "";
let nombreCom = "";
let profesional = "";
const lista = [];

// Funciones que aumentan el tiempo de espera
tiempoEspAT = () => tiempoEspA += 15;
tiempoEspBT = () => tiempoEspB += 15;

// Función para extraer del constructor Date solo el horario
horaDeRegistro = () => {
    let horario = new Date();
    let hora = horario.getHours();
    let minutos = horario.getMinutes();
    let segundos = horario.getSeconds();
    hora = (hora < 10) ? `0${hora}` : hora;
    minutos = (minutos < 10) ? `0${minutos}` : minutos;
    segundos = (segundos < 10) ? `0${segundos}` : segundos;
    return horaTurno = `${hora}:${minutos}:${segundos}`;
}

// Función para mostrar en el HTML cada turno nuevo
agregarCliente = (profesional) => {
    horaDeRegistro();
    nuevoCliente = `N° ${consultasHoy} - ${nombreCom} - ${horaTurno}`;
    const node = document.createElement("li");
    const textnode = document.createTextNode(nuevoCliente);
    node.appendChild(textnode);
    document.getElementById(profesional).appendChild(node);
    consultasHoy++;
}

// Función para cada opción
drGomez = () => {
    tiempoEspA == 0 ? alert(`${nombreCom} No tiene tiempo de espera con el Dr. Gomez`) :
        alert(`${nombreCom} Tiene un tiempo de espera de ${tiempoEspA} minutos con el Dr. Gomez`);
    tiempoEspAT();
    abogado = "Dr. Gomez";
    agregarCliente("drGomezHoy");
}

drFerraro = () => {
    tiempoEspB == 0 ? alert(`${nombreCom} No tiene tiempo de espera con el Dr. Ferraro`) :
        alert(`${nombreCom} Tiene un tiempo de espera de ${tiempoEspB} minutos con el Dr. Ferraro`);
    tiempoEspBT();
    abogado = "Dr. Ferraro";
    agregarCliente("drFerraroHoy");
}

// Busco el menor tiempo de espera
menorEsp = () => tiempoEspA <= tiempoEspB ? drGomez() : drFerraro();

// Función para discriminar por abogado los datos guardados en el localStorage
atendidos = () => {
    const listaGomez = lista.filter((buscar) => buscar.abogado.includes("Dr. Gomez"));
    const listaFerraro = lista.filter((buscar) => buscar.abogado.includes("Dr. Ferraro"));
    for (const cliente of listaGomez) {
        let listaTurnosGomez = document.getElementById("drGomez");
        listaTurnosGomez.innerHTML += `<li><pre><p class="textFuerte">
            Cliente: ${cliente.cliente}
            Hora de registro: ${cliente.horario}</pre></li>`;
    }
    for (const cliente of listaFerraro) {
        let listaTurnosFerraro = document.getElementById("drFerraro");
        listaTurnosFerraro.innerHTML += `<li><pre><p class="textFuerte">
            Cliente: ${cliente.cliente}
            Hora de registro: ${cliente.horario}</pre></li>`;
    }
    // Reviso cada objeto por consola
    console.log(...listaGomez);
    console.log(...listaFerraro);
}

// Switch para llamar a cada grupo de funciones según elección del usuario
cargarTurno = () => {
    switch (profesional.toUpperCase()) {
        case "A":
            drGomez();
            break;
        case "B":
            drFerraro();
            break;
        case "X":
            menorEsp();
            break;
    }
}

pagina.toUpperCase() == "INICIO" ? (
    // Función para tomar los datos desde el formulario
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        let formulario = evento.target
        nombreCom = `${formulario.children[1].value}`;
        profesional = `${formulario.children[3].value}`;
        document.getElementById("formulario").reset();
        cargarTurno();

        // Genero el objeto turnos y guardo cada ingreso por fecha.
        let dia = new Date();
        let turnos = new turno(abogado, nombreCom, dia.toLocaleDateString());
        let nTurnos = consultas;
        consultas++;
        localStorage.setItem(nTurnos, JSON.stringify(turnos));
        console.log(turnos);
    })
) : (
    // Función para crear un array con los objetos creados desde los datos del formulario y mostrarlos en clientes.html desde el más antiguo al más nuevo
    window.addEventListener("load", () => {
        for (let i = 0; i < localStorage.length; i++) {
            console.log(i)
            let turnos = localStorage.getItem(i);
            console.log(turnos);
            lista.unshift(JSON.parse(turnos));
        }
        atendidos();
    }));