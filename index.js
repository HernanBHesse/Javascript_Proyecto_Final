const tiempoEspAT = () => tiempoEspA += 15;

const tiempoEspBT = () => tiempoEspB += 15;

class turno {
    constructor(numero, abogado, cliente, horario) {
        this.turno = numero;
        this.abogado = abogado;
        this.cliente = cliente.toUpperCase();
        this.horario = horario;
    }
}

const drGomez = () => {
    if (tiempoEspA == 0) {
        alert(`${nombreCom} No tiene tiempo de espera con el Dr. Gomez`);
        tiempoEspAT();
    } else {
        alert(`${nombreCom} Tiene un tiempo de espera de ${tiempoEspA} minutos con el Dr. Gomez`);
        tiempoEspAT();
    }
    consultas += 1;
    abogado = "Dr. Gomez";
    return lista.push(new turno(consultas, abogado, nombreCom, Date()));
}

const drFerraro = () => {
    if (tiempoEspB == 0) {
        alert(`${nombreCom} No tiene tiempo de espera con el Dr. Ferraro`);
        tiempoEspBT();
    } else {
        alert(`${nombreCom} Tiene un tiempo de espera de ${tiempoEspB} minutos con el Dr. Ferraro`);
        tiempoEspBT();
    }
    consultas += 1;
    abogado = "Dr. Ferraro";
    return lista.push(new turno(consultas, abogado, nombreCom, Date()));
}

const menorEsp = () => {
    if (tiempoEspA <= tiempoEspB) {
        menorTiempo = tiempoEspA;
    } else {
        menorTiempo = tiempoEspB;
    }
    return menorTiempo;
}

const atendidos = () => {
    const listaGomez = lista.filter((buscar) => buscar.abogado.includes("Dr. Gomez"));
    const listaFerraro = lista.filter((buscar) => buscar.abogado.includes("Dr. Ferraro"));

    for (const cliente of listaGomez) {
        listaTurnosGomez += `\n\nTurno ${cliente.turno}\n   Cliente: ${cliente.cliente}\n   Registro: ${cliente.horario}`;
    }
    for (const cliente of listaFerraro) {
        listaTurnosFerraro += `\n\nTurno ${cliente.turno}\n   Cliente: ${cliente.cliente}\n   Registro: ${cliente.horario}`;
    }
    alert(`Los turnos registrados el día de hoy por el Dr. Gomez fueron:${listaTurnosGomez}`);
    alert(`Los turnos registrados el día de hoy por el Dr. Ferraro fueron:${listaTurnosFerraro}`);
}

let tiempoEspA = 0;
let tiempoEspB = 0;
let menorTiempo = 0;
let consultas = 0;
let abogado = "";
let nombreCom = "";
let listaTurnosGomez = "";
let listaTurnosFerraro = "";
let trabajo = false;
const lista = [];

let profesional = prompt("Ingrese con que abogado desea tener la cita:\n X) El turno más proximo\n A) Dr. Gomez\n B) Dr. Ferraro");

while ((profesional != "Salir") && (profesional != null)) {

    nombreCom = prompt("Ingrese su nombre completo separado con espacios Ej: Nombre Apellido ...");
    trabajo = true;

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

        default:
            alert(`${profesional} no es una opción valida`);
            break;
    }

    menorEsp();

    profesional = prompt(`Ingrese con que abogado desea tener la cita: \nX) El turno más proximo ${menorTiempo} minutos \nA) Dr. Gomez tiempo de espera de ${tiempoEspA} minutos \nB) Dr. Ferraro tiempo de espera de ${tiempoEspB} minutos`);
}

if (trabajo != false) {
    atendidos();
} else {
    alert(`El día de hoy no se atendieron clientes`);
}