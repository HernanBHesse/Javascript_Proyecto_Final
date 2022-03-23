class turno {
    constructor(numero, abogado, cliente, horario) {
        this.turno = numero;
        this.abogado = abogado;
        this.cliente = cliente.toUpperCase();
        this.horario = horario;
    }
}

tiempoEspAT = () => tiempoEspA += 15;

tiempoEspBT = () => tiempoEspB += 15;

horaDeRegistro = () => {
    consultas += 1;
    let horario = new Date();
    let hora = horario.getHours();
    hora = (hora < 10) ? `0${hora}` : hora;
    let minutos = horario.getMinutes();
    minutos = (minutos < 10) ? `0${minutos}` : minutos;
    let segundos = horario.getSeconds();
    segundos = (segundos < 10) ? `0${segundos}` : segundos;
    let horaTurno = `${hora}:${minutos}:${segundos}`;
    return lista.push(new turno(consultas, abogado, nombreCom, horaTurno));
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
    horaDeRegistro();
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
    horaDeRegistro();
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
        listaTurnosGomez.innerHTML += `<li><pre><p class="textFuerte">Turno ${cliente.turno}</p>
        Cliente: ${cliente.cliente}
        Hora de registro: ${cliente.horario}</pre></li>`;
    }
    for (const cliente of listaFerraro) {
        let listaTurnosFerraro = document.getElementById("drFerraro");
        listaTurnosFerraro.innerHTML += `<li><pre><p class="textFuerte">Turno ${cliente.turno}</p>
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

let tiempoEspA = 0;
let tiempoEspB = 0;
let menorTiempo = 0;
let consultas = 0;
let abogado = "";
let nombreCom = "";
let profesional = "";
let trabajo = false;
const lista = [];

let miFormulario = document.getElementById("formulario");
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    console.log("Turno cargado");
    let formulario = evento.target
    nombreCom = `${formulario.children[1].value}`;
    profesional = `${formulario.children[3].value}`;
    document.getElementById("formulario").reset();
    cargarTurno();
    menorEsp();
});