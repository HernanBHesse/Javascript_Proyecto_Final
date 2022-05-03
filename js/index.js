// Constructor para los objetos
class turno {
    constructor(abogado, cliente, horario, espera) {
        this.abogado = abogado;
        this.cliente = cliente.toUpperCase();
        this.horario = horario.toString();
        this.espera = espera;
    }
}

// Declaración de variables
let pagina = document.title;
let tiempoEspA = (sessionStorage.getItem("tiempoEspA") == null) ? 0 : parseInt(sessionStorage.getItem("tiempoEspA"));
let tiempoEspB = (sessionStorage.getItem("tiempoEspB") == null) ? 0 : parseInt(sessionStorage.getItem("tiempoEspB"));
let consultasHoy = (sessionStorage.getItem("consultasHoy") == null) ? 0 : parseInt(sessionStorage.getItem("consultasHoy"));
let consultas = localStorage.length;
let menorTiempo = 0;
let abogado = "";
let nombreCom = "";
let profesional = "";
const lista = [];
const listaHoy = [];

// Mediante el titulo de la pagina determino que eventos realizar
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
            turnoCargado();
        })
    ) :
    pagina.toUpperCase() == "CLIENTES" ? (
        // Función para crear un array con los objetos creados desde los datos del formulario y mostrarlos en clientes.html desde el más antiguo al más nuevo
        window.addEventListener("load", () => {
            for (let i = 0; i < localStorage.length; i++) {
                let turnos = localStorage.getItem(i);
                //Ordeno los clientes desde el más nuevo al más viejo.
                lista.unshift(JSON.parse(turnos));
            }
            atendidos(lista);
        })
    ) :
    pagina.toUpperCase() == "BACKUP" ? (
        // Función para crear un array con los objetos creados desde los datos del formulario y mostrarlos en clientes.html desde el más antiguo al más nuevo
        window.addEventListener("load", () => {
            for (let i = 0; i < sessionStorage.consultasHoy; i++) {
                let turnosHoy = sessionStorage.getItem(i);
                listaHoy.push(JSON.parse(turnosHoy));
            }
            atendidos(listaHoy);
            let boton = document.getElementById("borrar");
            boton.onclick = () => {
                borrar();
            }
        })
    ) : (
        // Función para crear un listado del personal almacenado en el archivo json
        window.addEventListener("load", () => {
            fetch('../personal.json')
                .then(res => res.json())
                .then(datos => {
                    personal(datos);
                })
        }));



// Inicio de funciones que se ejecutan en el INDEX
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


// Función para cada opción
drGomez = () => {
    abogado = "Dr. Gomez";
    tiempoEspA == 0 ? alertaSinEspera() : alertaConEspera(tiempoEspA);
    tiempoEspAT();
    agregarCliente(abogado, "drGomez", tiempoEspA - 15);
}

drFerraro = () => {
    abogado = "Dr. Ferraro";
    tiempoEspB == 0 ? alertaSinEspera() : alertaConEspera(tiempoEspB);
    tiempoEspBT();
    agregarCliente(abogado, "drFerraro", tiempoEspB - 15);
}

// Busco el menor tiempo de espera
menorEsp = () => tiempoEspA <= tiempoEspB ? drGomez() : drFerraro();


//Alertas y Librerías
//Alertas con Toastify
turnoCargado = () => {
    Toastify({
        text: "Turno cargado",
        duration: 2000,
        gravity: 'bottom',
        position: 'left'
    }).showToast();
}

// Alertas con SweetAlert
alertaSinEspera = () => {
    Swal.fire({
        icon: 'success',
        title: `${nombreCom} no tiene tiempo de espera con el ${abogado}`,
        showConfirmButton: false,
        timer: 4000
    });
}

alertaConEspera = (tiempo) => {
    Swal.fire({
        icon: 'success',
        title: `${nombreCom} tiene un tiempo de espera de ${tiempo} minutos con el ${abogado}`,
        showConfirmButton: false,
        timer: 4000
    });
}


// Funciones que aumentan el tiempo de espera
tiempoEspAT = () => {
    tiempoEspA += 15;
    sessionStorage.setItem("tiempoEspA", tiempoEspA);
}
tiempoEspBT = () => {
    tiempoEspB += 15;
    sessionStorage.setItem("tiempoEspB", tiempoEspB);
}


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
agregarCliente = (profesional, id, espera) => {
    horaDeRegistro();
    let mensaje = (espera != 0) ? `${espera} minutos` : `Sin espera`;
    let turnos = new turno(profesional, nombreCom, horaTurno, mensaje);
    sessionStorage.setItem(consultasHoy, JSON.stringify(turnos));
    let listaTurnos = document.getElementById(id);
    listaTurnos.innerHTML += `<tr>
                                <th scope="row">${consultasHoy+1}</th>
                                <td>${nombreCom}</td>
                                <td>${horaTurno}</td>
                                <td>${mensaje}</td>
                            </tr>`;
    consultasHoy++;
    sessionStorage.setItem("consultasHoy", consultasHoy);
}
// Fin de funciones que se ejecutan en el INDEX


// Función para discriminar por abogado los datos guardados en el localStorage y/o sessisionStorage
atendidos = (listado) => {
    const listaGomez = listado.filter((buscar) => buscar.abogado.includes("Dr. Gomez"));
    const listaFerraro = listado.filter((buscar) => buscar.abogado.includes("Dr. Ferraro"));
    for (const cliente of listaGomez) {
        let mostrar = (cliente.espera) === undefined ? "" : `<td>${cliente.espera}</td>`;
        let listaTurnosGomez = document.getElementById("drGomez");
        listaTurnosGomez.innerHTML += `
        <tr>
            <th scope="row">${cliente.cliente}</th>
            <td>${cliente.horario}</td>
            ${mostrar}
          </tr>
          `;
    }
    for (const cliente of listaFerraro) {
        let mostrar = (cliente.espera) === undefined ? "" : `<td>${cliente.espera}</td>`;
        let listaTurnosFerraro = document.getElementById("drFerraro");
        listaTurnosFerraro.innerHTML += `
        <tr>
            <th scope="row">${cliente.cliente}</th>
            <td>${cliente.horario}</td>
            ${mostrar}
          </tr>
          `;
    }
}


// Función para tomar datos desde el archivo json y mostrarlo por en la pagina de personal
personal = (datos) => {
    let listaPersonal = document.getElementById("listadoPersonal");
    for (let nombre of datos) {
        listaPersonal.innerHTML += `
        <tr>
            <th scope="row">${nombre.cargo}</th>
            <td>${nombre.nombre}</td>
            <td>${nombre.telefono}</td>
            <td>${nombre.antiguedad}</td>
          </tr>
          `;
    }
}


//Función para borrar el registro usando un mensaje con sweetalert
borrar = () => {
    Swal.fire({
        title: '¿Estas seguro?',
        text: "Borraras todo el registro",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Si, borrar',
        cancelButtonText: 'No, salir',
        backdrop: 'rgba(255, 0, 0, 0.5)'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear();
            sessionStorage.clear();
            Swal.fire(
                'Borrado!',
                'Todo el registro fue borrado',
                'success'
            )
            setTimeout(window.location.reload.bind(window.location), 3000);
        }
    })
}