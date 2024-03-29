// Función para cargar los participantes desde la API
function cargarParticipantes() {
    $.ajax({
        url: 'http://127.0.0.1:8000/api/joel/Participante',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            var selectParticipanteAzul = $('#selectParticipanteAzul');
            var selectParticipanteRojo = $('#selectParticipanteRojo');
            $.each(data, function( participante) {
                selectParticipanteAzul.append(`<option value="${participante.ID_Participante}">${participante.Nombre_Par}</option>`);
                selectParticipanteRojo.append(`<option value="${participante.ID_Participante}">${participante.Nombre_Par}</option>`);
            });
        },
        error: function(error) {
            console.error('Error al cargar participantes:', error);
        }
    });
}

// Función para cargar las veladas desde la API
function cargarVeladas() {
    $.ajax({
        url: 'http://127.0.0.1:8000/api/joel/Velada',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            var selectVelada = $('#selectVelada');
            $.each(data, function( velada) {
                selectVelada.append(`<option value="${velada.ID_Velada}">${velada.Nombre_Vel}</option>`);
            });
        },
        error: function(error) {
            console.error('Error al cargar veladas:', error);
        }
    });
}

// Función para agregar una pelea utilizando la API
function agregarPelea() {
    var nombrePelea = $('#nombrePelea').val();
    var participanteAzul = $('#selectParticipanteAzul').val();
    var participanteRojo = $('#selectParticipanteRojo').val();
    var juez = $('#selectJuez').val();
    var arbitro = $('#selectArbitro').val();
    var velada = $('#selectVelada').val();

    var data = {
        'Nombre_Pel': nombrePelea,
        'ID_Participante_Azul': participanteAzul,
        'ID_Participante_Rojo': participanteRojo,
        'ID_Juez': juez,
        'ID_Arbitro': arbitro,
        'ID_Velada': velada
    };

    $.ajax({
        url: 'http://127.0.0.1:8000/api/joel/Pelea',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(response) {
            console.log('Pelea agregada:', response);
            $('#resultadosPelea').text('Pelea agregada correctamente');
            window.location.href = "/peleas";
        },
        error: function(error) {
            console.error('Error:', error);
            $('#resultadosPelea').text('Error al agregar pelea');
        },
        complete: function() {
            $('#agregarPeleaBtn').prop('disabled', false);
        }
    });
}
