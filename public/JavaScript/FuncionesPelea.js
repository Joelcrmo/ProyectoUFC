// Obtener pelea
function obtenerPelea() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/api/joel/Pelea", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                obtenerNombres(response);
            } else {
                console.error("Error al obtener los datos de la pelea. Código de estado:", xhr.status);
            }
        }
    };
    xhr.send();
}


// Obtener nombres correspondientes a los IDs
function obtenerNombres(peleas) {
    // Variable para mantener el índice actual
    let index = 0;
    // Función para manejar las solicitudes de nombres de manera secuencial
    function obtenerNombresSecuencialmente() {
        if (index < peleas.length) {
            const pelea = peleas[index];
            obtenerNombreParticipante(pelea.ID_Participante_Azul, function(nombreAzul) {
                pelea.Nombre_Participante_Azul = nombreAzul;
                obtenerNombreParticipante(pelea.ID_Participante_Rojo, function(nombreRojo) {
                    pelea.Nombre_Participante_Rojo = nombreRojo;
                    obtenerNombreParticipante(pelea.ID_Juez, function(nombreJuez) {
                        pelea.Nombre_Juez = nombreJuez;
                        obtenerNombreParticipante(pelea.ID_Arbitro, function(nombreArbitro) {
                            pelea.Nombre_Arbitro = nombreArbitro;
                            obtenerNombreVelada(pelea.ID_Velada, function(nombreVelada) {
                                pelea.Nombre_Velada = nombreVelada;
                                // Avanzar al siguiente índice y llamar recursivamente a la función
                                index++;
                                obtenerNombresSecuencialmente();
                            });
                        });
                    });
                });
            });
        } else {
            // Cuando se procesen todas las peleas, mostrar la tabla
            mostrarPeleasTabla(peleas);
        }
    }

    // Iniciar el proceso
    obtenerNombresSecuencialmente();
}

// Obtener nombre del participante por ID
function obtenerNombreParticipante(ID_Participante, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/api/joel/Participante/" + ID_Participante, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                callback(response.Nombre_Par);
            } else {
                console.error("Error al obtener el nombre del participante. Código de estado:", xhr.status);
                callback("Error al obtener el nombre");
            }
        }
    };
    xhr.send();
}


// Obtener nombre de la velada por ID
function obtenerNombreVelada(ID_Velada, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/api/joel/Velada/" + ID_Velada, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                callback(response.Nombre_Vel);
            } else {
                console.error("Error al obtener el nombre de la velada. Código de estado:", xhr.status);
                callback("Error al obtener el nombre");
            }
        }
    };
    xhr.send();
}


// Mostrar tabla de peleas
function mostrarPeleasTabla(peleas) {
    var tablaHTML = "<table border='1'><tr><th>Nombre</th><th>Participante Azul</th><th>Participante Rojo</th><th>Juez</th><th>Árbitro</th><th>Velada</th><th>Acciones</th></tr>";
    peleas.forEach(function(pelea) {
        tablaHTML += "<tr>";
        tablaHTML += "<td>" + pelea.Nombre_Pel + "</td>";
        tablaHTML += "<td>" + pelea.Nombre_Participante_Azul + "</td>";
        tablaHTML += "<td>" + pelea.Nombre_Participante_Rojo + "</td>";
        tablaHTML += "<td>" + pelea.Nombre_Juez + "</td>";
        tablaHTML += "<td>" + pelea.Nombre_Arbitro + "</td>";
        tablaHTML += "<td>" + pelea.Nombre_Vel + "</td>";
        tablaHTML += "<td><button onclick=\"window.location.href='/peleas/editar/" + pelea.ID_Pelea + "'\">Editar</button>";
        tablaHTML += "<button onclick=\"eliminarPelea('" + pelea.ID_Pelea + "')\">Eliminar</button></td>";
        tablaHTML += "</tr>";
    });
    tablaHTML += "</table>";
    document.getElementById("resultadosPelea").innerHTML = tablaHTML;
}





// Función para eliminar una pelea
function eliminarPelea(ID_Pelea) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://127.0.0.1:8000/api/joel/Pelea/" + ID_Pelea, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200 || xhr.status === 204) {
                // Eliminación exitosa, podrías actualizar la interfaz de usuario aquí si es necesario
                console.log("La pelea con ID " + ID_Pelea + " ha sido eliminada exitosamente.");
                window.location.href = "/peleas";
                } else {
                console.error("Error al eliminar la pelea. Código de estado:", xhr.status);
                // Manejar el error según sea necesario
            }
        }
    };
    xhr.send();
}

function editarPelea(ID_Pelea, event) {
    // Evitar que el formulario se envíe automáticamente
    event.preventDefault();

    var form = document.getElementById("formEditarPelea");
    var formData = new FormData(form);

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "http://127.0.0.1:8000/api/joel/Pelea/" + ID_Pelea, true); // Cambiado a PUT
    xhr.setRequestHeader("X-CSRF-TOKEN", document.querySelector('meta[name="csrf-token"]').content);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200 || xhr.status === 204) {
                console.log("La pelea con ID " + ID_Pelea + " ha sido actualizada exitosamente.");
                window.location.href = "/peleas";
            } else {
                console.error("Error al actualizar la pelea. Código de estado:", xhr.status);
            }
        }
    };

    xhr.send(formData);
}
