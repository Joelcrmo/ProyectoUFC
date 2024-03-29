// Función para obtener los detalles de una velada específica
function obtenerDetallesVelada(ID_Velada) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8000/api/joel/Velada/" + ID_Velada, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var velada = JSON.parse(xhr.responseText);
                mostrarDetallesVelada(velada);
            } else {
                console.error("Error al obtener los detalles de la velada. Código de estado:", xhr.status);
            }
        }
    };
    xhr.send();
}

// Función para mostrar los detalles de la velada en el formulario de edición
function mostrarDetallesVelada(velada) {
    document.getElementById("nombreVelada").value = velada.Nombre_Vel;
    document.getElementById("fechaVelada").value = velada.Fecha_Vel;
    document.getElementById("selectLocalizacion").value = velada.ID_Localizacion;
}

// Función para enviar los cambios de la velada al servidor para su edición
function guardarCambiosVelada(ID_Velada) {
    var nombreVelada = document.getElementById("nombreVelada").value;
    var fechaVelada = document.getElementById("fechaVelada").value;
    var localizacion = document.getElementById("selectLocalizacion").value;

    var data = {
        'Nombre_Vel': nombreVelada,
        'ID_Localizacion': localizacion,
        'Fecha_Vel': fechaVelada
    };

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "http://127.0.0.1:8000/api/joel/Velada/" + ID_Velada, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log('Velada actualizada:', xhr.responseText);
                window.location.href = "/velada"; // Redirigir a la página de veladas después de la edición
            } else {
                console.error("Error al guardar los cambios de la velada. Código de estado:", xhr.status);
            }
        }
    };
    xhr.send(JSON.stringify(data));
}

// Obtener ID de Velada desde la URL
var url = window.location.href;
var ID_Velada = url.substring(url.lastIndexOf("/") + 1);

// Obtener y mostrar los detalles de la velada al cargar la página
window.onload = function() {
    obtenerDetallesVelada(ID_Velada);
};
