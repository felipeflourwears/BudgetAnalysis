// Obtener el elemento del input de correo
var correoInput = document.getElementById('correo-input');

// Agregar un evento de escucha para validar el correo al perder el foco
correoInput.addEventListener('blur', function() {
    // Obtener el valor del input de correo
    var correo = correoInput.value;

    // Expresión regular para validar el correo electrónico
    var regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validar el correo utilizando la expresión regular
    if (!regexCorreo.test(correo)) {
        // El correo no es válido
        // SWAL en versión de promesa
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingresa un correo válido'
        }).then(function() {
        // Restablecer el valor del campo de correo a una cadena vacía
            correoInput.value = '';
        });
    }
});