// Función para realizar la autenticación del usuario
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Realizar una solicitud GET a la API para obtener los detalles del usuario
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `http://127.0.0.1:8000/api/joel/Usuario`, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                if (data && data.data.length > 0) {
                    const user = data.data[0];
                    // Verificar si las credenciales coinciden
                    if (user.Nombre_Usu === username && user.Password_Usu === password) {
                        // Generar el token
                        const token = generateToken(user.ID_Usuario);
                        // Guardar el token en la API
                        addTokenToAPI(token);
                    } else {
                        // Mostrar un mensaje de error si las credenciales son incorrectas
                        alert('Usuario o contraseña incorrecta');
                    }
                } else {
                    // Mostrar un mensaje de error si el usuario no se encuentra
                    alert('Usuario no encontrado');
                }
            } else {
                console.error("Error al obtener los datos del usuario. Código de estado:", xhr.status);
                // Mostrar un mensaje de error en caso de fallo en la solicitud
                alert('Error al realizar la autenticación');
            }
        }
    };
    xhr.send();
}

// Función para generar el token
function generateToken(userID) {
    // Se genera un token aleatorio para propósitos de demostración
    const token = Math.random().toString(36).substr(2);
    const creationDate = new Date();
    const expirationDate = new Date();
    expirationDate.setDate(creationDate.getDate() + 2); // El token expira en dos días

    // Formatear la fecha en formato ISO
    const formattedCreationDate = creationDate.toISOString();
    const formattedExpirationDate = expirationDate.toISOString();

    // Objeto que representa el token
    const tokenData = {
        ID_Usuario: userID,
        Token: token,
        Fecha_Token: formattedCreationDate,
        Expiracion_Token: formattedExpirationDate
    };

    return JSON.stringify(tokenData);
}

// Función para añadir el token a la API
function addTokenToAPI(token) {
    // Realizar una solicitud POST a la API para añadir el token
    var xhr = new XMLHttpRequest();
    xhr.open("POST", `http://127.0.0.1:8000/api/joel/Validacion`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log('Token añadido correctamente');
                // Redirigir al usuario al index
                window.location.href = '/';
            } else {
                console.error("Error al añadir el token. Código de estado:", xhr.status);
                // Mostrar un mensaje de error en caso de fallo en la solicitud
                alert('Error al realizar la autenticación');
            }
        }
    };
    xhr.send(token);
}

// Vincular el evento de clic al botón de inicio de sesión
document.getElementById('loginButton').addEventListener('click', login);
