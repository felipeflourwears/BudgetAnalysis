function validarArchivo(input) {
    var allowedExtensions = /(\.gif|\.png|\.jpeg|\.jpg)$/i;
    var filePath = input.value;
    var fileExtension = filePath.substring(filePath.lastIndexOf('.') + 1);

    if (!allowedExtensions.exec(filePath)) {
        /* alert('Archivo no compatible. Por favor, selecciona una imagen de tipo GIF, PNG, JPEG o JPG.'); */
        Swal.fire(
            'Archivo Invalido',
            'Solamente(jpg, jpeg, png, gif).',
            'error'
        )
        input.value = '';
        return false;
    }
    }