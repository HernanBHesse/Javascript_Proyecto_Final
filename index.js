function tiempoEspAT() {
    return tiempoEspA += 15;
}

function tiempoEspBT() {
    return tiempoEspB += 15;
}

function drGomez() {
    if (tiempoEspA == 0) {
        alert(`${nombreCom} No tiene tiempo de espera con el Dr. Gomez`);
        tiempoEspAT();
    } else {
        alert(`${nombreCom} Tiene un tiempo de espera de ${tiempoEspA} minutos con el Dr. Gomez`);
        tiempoEspAT();
    }
    return listaA += `\n Consulta ${consutasA+=1} a el/la sr/sra ${nombreCom}`;
}

function drFerraro() {
    if (tiempoEspB == 0) {
        alert(`${nombreCom} No tiene tiempo de espera con el Dr. Ferraro`);
        tiempoEspBT();
    } else {
        alert(`${nombreCom} Tiene un tiempo de espera de ${tiempoEspB} minutos con el Dr. Ferraro`);
        tiempoEspBT();
    }
    return listaB += `\n Consulta ${consutasB+=1} a el/la sr/sra ${nombreCom}`;
}

function menorEsp() {
    if (tiempoEspA <= tiempoEspB) {
        menorTiempo = tiempoEspA;
    } else {
        menorTiempo = tiempoEspB;
    }
    return menorTiempo;
}

function atendidos() {
    alert(`El Dr. Gomez atendió: ${listaA}`);
    alert(`El Dr. Ferraro atendió: ${listaB}`);
}

let tiempoEspA = 0;
let tiempoEspB = 0;
let menorTiempo = 0;
let consutasA = 0;
let consutasB = 0;
let listaA = "";
let listaB = "";

let nombreCom = prompt("Ingrese su nombre completo separado con espacios Ej: Nombre Apellido ...");
let profesional = prompt("Ingrese con que abogado desea tener la cita:\n X) El turno más proximo\n A) Dr. Gomez\n B) Dr. Ferraro");

while ((profesional != "Salir") && (profesional != null)) {

    switch (profesional) {

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

    nombreCom = prompt("Ingrese su nombre completo separado con espacios Ej: Nombre Apellido ...");


    menorEsp();

    profesional = prompt(`Ingrese con que abogado desea tener la cita: \nX) El turno más proximo ${menorTiempo} minutos \nA) Dr. Gomez tiempo de espera de ${tiempoEspA} minutos \nB) Dr. Ferraro tiempo de espera de ${tiempoEspB} minutos`);
}

atendidos ();