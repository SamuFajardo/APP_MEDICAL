


var citas = [];

function agendarCita(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    var nombre = document.getElementById('nombre').value;
    var edad = document.getElementById('edad').value;
    var peso = document.getElementById('peso').value;
    var altura = document.getElementById('altura').value;
    var sintomas = document.getElementById('sintomas').value;
    var medico = document.getElementById('medico').value;

    // Almacenar la información de la cita en el array de citas
    citas.push({ nombre: nombre, edad: edad, peso: peso, altura: altura, sintomas: sintomas, medico: medico });

    // Actualizar la lista de personas con citas en la sección de "Citas"
    actualizarListaPersonasCitas();

    // Resto del código para mostrar la confirmación y limpiar el formulario...
}

function actualizarListaPersonasCitas() {
    var listaPersonasCitas = document.getElementById('lista-personas-citas');
    listaPersonasCitas.innerHTML = '';

    // Obtener nombres únicos de personas que han agendado citas
    var nombresUnicos = [...new Set(citas.map(cita => cita.nombre))];

    // Crear enlaces para cada nombre
    nombresUnicos.forEach(nombre => {
        var enlace = document.createElement('a');
        enlace.textContent = nombre;
        enlace.href = '#';  // Puedes enlazar a una función específica aquí
        enlace.onclick = function () {
            mostrarCitasPorNombre(nombre);
        };

        var listItem = document.createElement('li');
        listItem.appendChild(enlace);

        listaPersonasCitas.appendChild(listItem);
    });
}

function mostrarCitasPorNombre(nombre) {
    // Filtrar citas por el nombre de la persona
    var citasPersona = citas.filter(cita => cita.nombre === nombre);

    // Mostrar las citas en la sección de "Citas" (puedes adaptar esto según tu diseño)
    var infoCitaElemento = document.getElementById('info-cita');
    infoCitaElemento.innerHTML = '';

    citasPersona.forEach(cita => {
        var p = document.createElement('p');
        p.textContent = `Médico: ${cita.medico}, Edad: ${cita.edad}, Peso: ${cita.peso}, Altura: ${cita.altura}, Síntomas: ${cita.sintomas}`;
        infoCitaElemento.appendChild(p);
    });

    // Mostrar la sección de "Citas"
    mostrarSeccion('citas');
}



function mostrarMedico(medico) {
    // Oculta todos los médicos
    var medicos = ['odontologo', 'psicologo', 'oncologo', 'neumologo', 'quiropractico'];
    medicos.forEach(function (m) {
        var elemento = document.getElementById(m);
        elemento.style.display = 'none';
    });

    // Muestra el médico seleccionado
    var medicoSeleccionado = document.getElementById(medico);
    medicoSeleccionado.style.display = 'block';
}





function agendarCita(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    // Obtener valores del formulario
    var nombre = document.getElementById('nombre').value;
    var edad = document.getElementById('edad').value;
    var peso = document.getElementById('peso').value;
    var altura = document.getElementById('altura').value;
    var sintomas = document.getElementById('sintomas').value;
    var medicoSeleccionado = document.getElementById('medico').value;

    // Mostrar mensaje de confirmación
    var mensajeConfirmacion = document.getElementById('mensaje-confirmacion');
    var infoCita = document.getElementById('info-cita');

    infoCita.textContent = `Nombre: ${nombre}, Edad: ${edad}, Peso: ${peso}, Altura: ${altura}, Síntomas: ${sintomas}, Médico: ${medicoSeleccionado}`;

    mensajeConfirmacion.style.display = 'block';
}

// Añadir esta función si deseas ocultar el mensaje de confirmación después de proceder al pago
function ocultarMensajeConfirmacion() {
    var mensajeConfirmacion = document.getElementById('mensaje-confirmacion');
    mensajeConfirmacion.style.display = 'none';
}




var historialClinico = {}; // Objeto para almacenar la historia clínica por nombre

function agendarCita(event) {
    event.preventDefault();

    var nombre = document.getElementById('nombre').value;
    var edad = document.getElementById('edad').value;
    var peso = document.getElementById('peso').value;
    var altura = document.getElementById('altura').value;
    var sintomas = document.getElementById('sintomas').value;
    var medicoSeleccionado = document.getElementById('medico').value;

    // Crear objeto con detalles de la cita
    var cita = {
        agendadoPor: nombre,
        edad: edad,
        peso: peso,
        altura: altura,
        sintomas: sintomas,
        medico: medicoSeleccionado
    };

    // Agregar la cita al historial clínico
    if (!historialClinico[nombre]) {
        historialClinico[nombre] = [];
    }
    historialClinico[nombre].push(cita);

    // Mostrar mensaje de confirmación
    var mensajeConfirmacion = document.getElementById('mensaje-confirmacion');
    var infoCita = document.getElementById('info-cita');

    infoCita.textContent = `Cita agendada para ${nombre} con el ${medicoSeleccionado}.`;

    mensajeConfirmacion.style.display = 'block';

    // Limpiar el formulario para una nueva cita
    document.getElementById('formulario-cita').reset();

    // Mostrar la historia clínica actualizada
    mostrarHistorialClinico();
}





function mostrarCitasPaciente(nombre) {
    // Mostrar solo las citas del paciente seleccionado
    var historiaClinica = document.getElementById('historia-clinica');
    historiaClinica.innerHTML = '<h2>Historia Clínica</h2>';
    
    var listaPacientes = document.getElementById('lista-pacientes');
    listaPacientes.style.display = 'none';  // Oculta la lista de pacientes al mostrar las citas

    if (historialClinico[nombre]) {
        var historial = historialClinico[nombre];
        var citasHTML = historial.map(function (cita, index) {
            return `
                <div>
                    <p><strong>Cita ${index + 1}:</strong></p>
                    <p>Agendado por: ${cita.agendadoPor}</p>
                    <p>Edad: ${cita.edad}, Peso: ${cita.peso}, Altura: ${cita.altura}</p>
                    <p>Síntomas: ${cita.sintomas}</p>
                    <p>Médico: ${cita.medico}</p>
                    <hr>
                </div>
            `;
        });

        historiaClinica.innerHTML += citasHTML.join('');
    }
}
function continuarAgendando() {
    // Ocultar el mensaje de confirmación
    var mensajeConfirmacion = document.getElementById('mensaje-confirmacion');
    mensajeConfirmacion.style.display = 'none';
}

// Llamar a esta función al iniciar la página para mostrar la historia clínica
mostrarHistorialClinico();