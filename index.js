class turno {
    constructor(abogado, cliente, horario) {
        this.abogado = abogado;
        this.cliente = cliente.toUpperCase();
        this.horario = horario.toString();
    }
}

let tiempoEspA = 0;
let tiempoEspB = 0;
let menorTiempo = 0;
let consultas = 0;
let consultasHoy = 1;
let abogado = "";
let nombreCom = "";
let profesional = "";
let trabajo = false;
const lista = [];

tiempoEspAT = () => tiempoEspA += 15;

tiempoEspBT = () => tiempoEspB += 15;

horaDeRegistro = () => {
    let horario = new Date();
    let hora = horario.getHours();
    hora = (hora < 10) ? `0${hora}` : hora;
    let minutos = horario.getMinutes();
    minutos = (minutos < 10) ? `0${minutos}` : minutos;
    let segundos = horario.getSeconds();
    segundos = (segundos < 10) ? `0${segundos}` : segundos;
    return horaTurno = `${hora}:${minutos}:${segundos}`;
}

agregarCliente = (profesional) => {
    horaDeRegistro();
    nuevoCliente = `N° ${consultasHoy} - ${nombreCom} - ${horaTurno}`;
    const node = document.createElement("li");
    const textnode = document.createTextNode(nuevoCliente);
    node.appendChild(textnode);
    document.getElementById(profesional).appendChild(node);
    consultasHoy++;
}

drGomez = () => {
    if (tiempoEspA == 0) {
        alert(`${nombreCom} No tiene tiempo de espera con el Dr. Gomez`);
        tiempoEspAT();
    } else {
        alert(`${nombreCom} Tiene un tiempo de espera de ${tiempoEspA} minutos con el Dr. Gomez`);
        tiempoEspAT();
    }
    abogado = "Dr. Gomez";

    agregarCliente("drGomezHoy");
}

drFerraro = () => {
    if (tiempoEspB == 0) {
        alert(`${nombreCom} No tiene tiempo de espera con el Dr. Ferraro`);
        tiempoEspBT();
    } else {
        alert(`${nombreCom} Tiene un tiempo de espera de ${tiempoEspB} minutos con el Dr. Ferraro`);
        tiempoEspBT();
    }
    abogado = "Dr. Ferraro";

    agregarCliente("drFerraroHoy");
}

menorEsp = () => {
    if (tiempoEspA <= tiempoEspB) {
        menorTiempo = tiempoEspA;
    } else {
        menorTiempo = tiempoEspB;
    }
    return menorTiempo;
}

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
}

cargarTurno = () => {
    switch (profesional.toUpperCase()) {
        case "A":
            drGomez();
            break;
        case "B":
            drFerraro();
            break;
        case "X":
            if (tiempoEspA <= tiempoEspB) {
                drGomez();
            } else {
                drFerraro();
            }
            break;
        case "T":
            atendidos();
            break;
        default:
            alert(`${profesional} no es una opción valida`);
            break;
    }
}

window.addEventListener("load", () => {
    for (let i = 0; i < localStorage.length; i++) {
        let clave = localStorage.key(i);
        let turnos = localStorage.getItem(clave);
        console.log(turnos);
        lista.push(JSON.parse(turnos));
        consultas = i + 1;
    }
    atendidos();
})


let miFormulario = document.getElementById("formulario");
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    let formulario = evento.target
    nombreCom = `${formulario.children[1].value}`;
    profesional = `${formulario.children[3].value}`;
    document.getElementById("formulario").reset();
    cargarTurno();

    let dia = new Date();

    let turnos = new turno(abogado, nombreCom, dia.toLocaleDateString());
    let nTurnos = "turno" + consultas;
    consultas++;
    localStorage.setItem(nTurnos, JSON.stringify(turnos));
    console.log(turnos);
});