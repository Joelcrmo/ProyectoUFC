<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="{{ asset('estilos.css') }}">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    <title>Añadir Pelea</title>
</head>
<body>

@include('header')

<h2>Añadir Pelea</h2>

<div id="formularioPelea">
    <form action="{{ route('peleas/insertar') }}" method="POST">


        @csrf
        <label for="nombrePelea">Nombre de la Pelea:</label>
        <input type="text" id="nombrePelea" name="Nombre_Pel"><br><br>

        <label for="selectParticipanteAzul">Participante Azul:</label>
        <select id="selectParticipanteAzul" name="ID_Participante_Azul">
            @foreach($participantesAzules as $participante)
                <option value="{{ $participante->ID_Participante }}">{{ $participante->Nombre_Par }}</option>
            @endforeach
        </select><br><br>

        <label for="selectParticipanteRojo">Participante Rojo:</label>
        <select id="selectParticipanteRojo" name="ID_Participante_Rojo">
            @foreach($participantesRojos as $participante)
                <option value="{{ $participante->ID_Participante }}">{{ $participante->Nombre_Par }}</option>
            @endforeach
        </select><br><br>

        <label for="selectJuez">Juez:</label>
        <select id="selectJuez" name="ID_Juez">
            @foreach($jueces as $participante)
                <option value="{{ $participante->ID_Participante }}">{{ $participante->Nombre_Par }}</option>
            @endforeach
        </select><br><br>

        <label for="selectArbitro">Árbitro:</label>
        <select id="selectArbitro" name="ID_Arbitro">
            @foreach($arbitros as $participante)
                <option value="{{ $participante->ID_Participante }}">{{ $participante->Nombre_Par }}</option>
            @endforeach
        </select><br><br>

        <label for="selectVelada">Velada:</label>
        <select id="selectVelada" name="ID_Velada">
            @foreach($veladas as $velada)
                <option value="{{ $velada->ID_Velada }}">{{ $velada->Nombre_Vel }}</option>
            @endforeach
        </select><br><br>

        <button type="submit" id="agregarPeleaBtn">Agregar Pelea</button>
    </form>
</div>

<div id="resultadosPelea"></div>

@include('footer')

<script src="{{ asset('JavaScript/InsertarPelea.js') }}"></script>

<script>
    $(document).ready(function() {
        cargarParticipantes();
        cargarVeladas();

        $('#agregarPeleaBtn').click(function() {
            $(this).prop('disabled', true);
            agregarPelea();
            window.location.href = "/peleas";
        });
    });
</script>

</body>
</html>
