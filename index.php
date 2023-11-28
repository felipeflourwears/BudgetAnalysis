<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <meta name="description" content="">
        <meta name="author" content="TemplateMo">

        <title>Budget PopAtelier</title>

        <!-- CSS FILES -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">

        <link href="./css/bootstrap.min.css" rel="stylesheet">

        <link href="./css/bootstrap-icons.css" rel="stylesheet">

        <link href="./css/magnific-popup.css" rel="stylesheet">

        <link href="./css/templatemo-first-portfolio-style.css" rel="stylesheet">
        <link rel="shortcut icon" href="./images/pop.png" type="image/x-icon">
    </head>
    
    <body>

        <section class="preloader">
            <div class="spinner">
                <span class="spinner-rotate"></span>    
            </div>
        </section>

        <nav class="navbar navbar-expand-lg">
            <div class="container">

                <a href="#" class="navbar-brand mx-auto mx-lg-0"><img src="./images/pop.png" alt="Logo" class="logo"></a>

            </div>
        </nav>

        <br><br> <br><br> <br><br>

        <style>
            .main-wrapper {
            width: 100%; /* Agrega un ancho del 100% al contenedor del main */
            }

            main {
            display: flex;
            justify-content: center;
            align-items: center;
           /*  border: 2px solid red;
            box-sizing: border-box; */
            padding: 10px;
            width: 100%; /* Agrega un ancho del 100% al main */
            }

            .table-container {
            width: 100%; /* Agrega un ancho del 100% al contenedor de la tabla */
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            }

            table {
            font-size: 14px;
            border-collapse: collapse;
            margin: 0 auto;
            border: 2px solid green;
            box-sizing: border-box;
            width: 100%;
            }

            th, td {
            padding: 8px;
            text-align: center;
            }

            th {
            background-color: #f2f2f2;
            font-weight: bold;
            }
            header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #f2f2f2;
            padding: 10px;
            }

            h1 {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
            }
        </style>
        <header>
            <h1>Budget Stands &nbsp;<i class="bi bi-archive-fill"></i></h1>
        </header>

        <form action="#" method="POST">
            <div class="main-wrapper">
                <main>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12">
                                <button type="button" id="addHeaderBtn" class="btn btn-primary mr-2">Add Header</button>
                                <button type="button" id="deleteHeaderBtn" class="btn btn-danger">Delete Header</button>
                            </div>
                        </div>

                        <br>
                        <div class="row">
                            
                        </div>
                        <div class="headers-container">
                            <!-- Aquí se agregarán dinámicamente los campos de entrada -->
                        </div>
                        <br>
                    </div>
                </main>
            </div>

            <div class="main-wrapper">
                <main>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12">
                                <button type="button" id="addShielfBtn" class="btn btn-primary mr-2">Add Shielf</button>
                                <button type="button" id="deleteShielfBtn" class="btn btn-danger">Delete Shielf</button>
                            </div>
                        </div>

                        <br>
                        <div class="row">
                            
                        </div>
                        <div class="shielfs-container">
                            <!-- Aquí se agregarán dinámicamente los campos de entrada -->
                        </div>
                        <br>
                        <button type="button" id="addToListBtn" class="btn btn-primary">Add to list</button>
                        <button type="submit" class="btn btn-primary">Budget</button>
                        <button type="button" class="btn btn-primary">Download PDF</button>
                    </div>
                </main>
            </div>
            <div id="dataDisplay">Lotes</div>
        </form>


        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script>
            $(document).ready(function() {
                // Función para los botones de incrementar y decrementar
                $('.headers-container').on('click', '.btn-number', function(e) {
                    e.preventDefault();

                    var fieldName = $(this).attr('data-field');
                    var type = $(this).attr('data-type');
                    var input = $(this).closest('.input-group').find("input[name='" + fieldName + "']");
                    var currentValue = parseInt(input.val());

                    if (!isNaN(currentValue)) {
                        if (type === 'minus') {
                            if (currentValue > input.attr('min')) {
                                input.val(currentValue - 1).change();
                            }
                        } else if (type === 'plus') {
                            if (currentValue < input.attr('max')) {
                                input.val(currentValue + 1).change();
                            }
                        }
                    }
                });

                // Función para manejar el cambio en el campo de entrada
                $('.headers-container').on('focusin', '.input-number', function() {
                    $(this).data('oldValue', $(this).val());
                });

                $('.headers-container').on('change', '.input-number', function() {
                    var minValue = parseInt($(this).attr('min'));
                    var maxValue = parseInt($(this).attr('max'));
                    var valueCurrent = parseInt($(this).val());

                    if (!isNaN(valueCurrent)) {
                        if (valueCurrent < minValue) {
                            $(this).val(minValue);
                        }
                        if (valueCurrent > maxValue) {
                            $(this).val(maxValue);
                        }
                    } else {
                        $(this).val($(this).data('oldValue'));
                    }
                });
            });
        </script>
        <script>
            $(document).ready(function() {
                $('#addHeaderBtn').click(function() {
                    var newHeader = `
                        <div class="row">
                            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                                <div class="form-group">
                                    <label class="bmd-label-floating">Header size:</label>
                                    <select class="form-control" name="headerSize">
                                        <option value="120">120</option>
                                        <option value="90">90</option>
                                        <option value="60">60</option>
                                        <option value="45">45</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-6 col-md-6">
                                <div class="form-group">
                                    <label class="bmd-label-floating">Select your PI shielf:</label>
                                    <div class="input-group">
                                        <select class="form-control" name="headerSizePi">
                                            <option value="P2">P2</option>
                                            <option value="P1.8">P1.8</option>
                                            <option value="P1.5">P1.5</option>
                                            <option value="P1.2">P1.2</option>
                                        </select>
                                        &nbsp;&nbsp;
                                        <span class="input-group-btn">
                                            <button type="button" class="btn btn-danger btn-number" data-type="minus" data-field="quantity">
                                                <span class="glyphicon glyphicon-minus">-</span>
                                            </button>
                                        </span>
                                        <input type="text" name="quantity" class="form-control input-number" value="1" min="1" max="10">
                                        <span class="input-group-btn">
                                            <button type="button" class="btn btn-success btn-number" data-type="plus" data-field="quantity">
                                                <span class="glyphicon glyphicon-plus">+</span>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    $('.headers-container').append(newHeader);
                });
            });

            $(document).ready(function() {
                $('#addHeaderBtn').click(function() {
                    var newHeader = `
                        <!-- ... (el mismo contenido HTML que en la respuesta anterior) ... -->
                    `;
                    $('.headers-container').append(newHeader);
                });

                $('#deleteHeaderBtn').click(function() {
                    $('.headers-container .row:last-child').remove();
                });
            });
        </script>

        <script>
        $(document).ready(function() {
            $('#addShielfBtn').click(function() {
                var newShielf = `
                    <div class="row">
                        <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                            <div class="form-group">
                                <label class="bmd-label-floating">Shielf size:</label>
                                <select class="form-control shielf-size" name="shielfSize">
                                    <option value="120">120</option>
                                    <option value="90">90</option>
                                    <option value="60">60</option>
                                    <option value="45">45</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-6 col-md-6">
                            <div class="form-group">
                                <label class="bmd-label-floating">Select your PI shielf:</label>
                                <div class="input-group">
                                    <select class="form-control pi-shielf" name="piShielf">
                                        <option value="P1.8">P1.8</option>
                                        <option value="P1.57">P1.57</option>
                                        <option value="P1.2">P1.2</option>
                                    </select>
                                    &nbsp;&nbsp;
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-danger btn-number" data-type="minus" data-field="quantity">
                                            <span class="glyphicon glyphicon-minus">-</span>
                                        </button>
                                    </span>
                                    <input type="text" name="quantity" class="form-control input-number" value="1" min="1" max="10">
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-success btn-number" data-type="plus" data-field="quantity">
                                            <span class="glyphicon glyphicon-plus">+</span>
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                $('.shielfs-container').append(newShielf);
            });

            $('#deleteShielfBtn').click(function() {
                $('.shielfs-container .row:last-child').remove();
            });

            // Función para los botones de incrementar y disminuir
            $('.shielfs-container').on('click', '.btn-number', function(e) {
                e.preventDefault();

                var fieldName = $(this).attr('data-field');
                var type = $(this).attr('data-type');
                var input = $(this).closest('.input-group').find("input[name='" + fieldName + "']");
                var currentValue = parseInt(input.val());

                if (!isNaN(currentValue)) {
                    if (type === 'minus') {
                        if (currentValue > input.attr('min')) {
                            input.val(currentValue - 1).change();
                        }
                    } else if (type === 'plus') {
                        if (currentValue < input.attr('max')) {
                            input.val(currentValue + 1).change();
                        }
                    }
                }
            });

            // Función para manejar el cambio en el campo de entrada
            $('.shielfs-container').on('focusin', '.input-number', function() {
                $(this).data('oldValue', $(this).val());
            });

            $('.shielfs-container').on('change', '.input-number', function() {
                var minValue = parseInt($(this).attr('min'));
                var maxValue = parseInt($(this).attr('max'));
                var valueCurrent = parseInt($(this).val());

                if (!isNaN(valueCurrent)) {
                    if (valueCurrent < minValue) {
                        $(this).val(minValue);
                    }
                    if (valueCurrent > maxValue) {
                        $(this).val(maxValue);
                    }
                } else {
                    $(this).val($(this).data('oldValue'));
                }
            });
        });
        </script>


        <script>
           $(document).ready(function() {
            
            //Prices
            var video_procesor = 377.988;
            var freight_import_taxes = 487.20;
            var install = 931.02;
            var cms = 152.1;
            var noc = 720;
            var totalFixed;

            // Calcular la suma de los precios
            totalFixed = video_procesor + freight_import_taxes + install + cms + noc;
            
            var preciosPorSeleccion = {
                    'P2 120 Header': 1392.391,
                    'P1.8 120 Header': 2086.5,
                    'P1.5 120 Header': 2386.8,
                    'P1.2 120 Header': 3110.276,

                    'P2 90 Header': 1189.864,
                    'P1.8 90 Header': 1431.3,
                    'P1.5 90 Header': 1627.47,
                    'P1.2 90 Header': 2386.956,

                    'P2 60 Header': 848.9,
                    'P1.8 60 Header': 1171.3,
                    'P1.5 60 Header': 1232.4,
                    'P1.2 60 Header': 1656.2,

                    'P2 45 Header': 848.9,
                    'P1.8 45 Header': 1171.3,
                    'P1.5 45 Header': 1232.4,
                    'P1.2 45 Header': 1656.2,

                    'P1.8 120 Shielf': 640.9,
                    'P1.57 120 Shielf': 672.1,
                    'P1.2 120 Shielf': 861.9,

                    'P1.8 90 Shielf': 456.3,
                    'P1.57 90 Shielf': 533,
                    'P1.2 90 Shielf': 655.2,

                    'P1.8 60 Shielf': 362.7,
                    'P1.57 60 Shielf': 440.7,
                    'P1.2 60 Shielf': 487.5,

                    'P1.8 45 Shielf': 555.1,
                    'P1.57 45 Shielf': 617.5,
                    'P1.2 45 Shielf': 679.9
                };
            
            
            var currentBatch = 1; // Inicializar el contador de lotes

            function saveDataToStorage(data, batch) {
                localStorage.setItem('itemsData' + batch, JSON.stringify(data));
            }

            function updateDataDisplay() {
                var dataDisplay = $('#dataDisplay');
                dataDisplay.empty(); // Limpiar el contenido actual
                var totalAllBatchesPrice = 0; // Inicializar el precio total de todos los lotes

                for (var i = 1; i < currentBatch; i++) {
                    var storedData = JSON.parse(localStorage.getItem('itemsData' + i));

                    if (storedData !== null) { // Verificar si storedData no es nulo
                        var totalPricePerBatch = 0; // Inicializar el precio total del lote actual

                        var table = $('<table class="batch-table"></table>');

                        // Calcular el precio total del lote actual
                        storedData.forEach(function(item) {
                            var itemKey = item.size;
                            if (preciosPorSeleccion.hasOwnProperty(itemKey)) {
                                var pricePerItem = preciosPorSeleccion[itemKey];
                                var totalForItem = pricePerItem * item.quantity;
                                totalPricePerBatch += totalForItem;
                            }
                        });

                        // Agregar el total fijo al precio total del lote actual
                        totalPricePerBatch += totalFixed;

                        // Actualizar el total de todos los lotes sumados
                        totalAllBatchesPrice += totalPricePerBatch;

                        // Crear fila para mostrar el precio total del lote
                        var totalRow = $('<tr><td colspan="4">Price Batch(Including prices for requeriments) ' + i + ': ' + totalPricePerBatch + '</td></tr>');
                        table.append(totalRow);

                        // Crear la cabecera de la tabla
                        var thead = $('<thead><tr><th colspan="5">Lote ' + i + '</th><th><button class="delete-batch-btn" data-batch="' + i + '">Delete Batch</button></th></tr></thead>');
                        table.append(thead);

                        var tbody = $('<tbody></tbody>');

                        // Crear filas para cada elemento en el lote
                        storedData.forEach(function(item) {
                            var row = $('<tr></tr>');
                            for (var key in item) {
                                if (item.hasOwnProperty(key)) {
                                    row.append('<td>' + key + '</td>');
                                    row.append('<td>' + item[key] + '</td>');
                                }
                            }

                            // Agregar columna para el precio total por tipo y tamaño
                            var itemKey = item.size;
                            if (preciosPorSeleccion.hasOwnProperty(itemKey)) {
                                var pricePerItem = preciosPorSeleccion[itemKey];
                                var totalForItem = pricePerItem * item.quantity;
                                row.append('<td>Precio por artículo: ' + pricePerItem + '</td>');
                                row.append('<td>Precio total: ' + totalForItem + '</td>');
                            }

                            tbody.append(row);
                        });

                        table.append(tbody);
                        dataDisplay.append(table);
                    }
                }
                // Mostrar el precio total de todos los lotes sumados, incluyendo los totales fijos por lote
                var totalAllBatchesRow = $('<div>Total de todos los lotes (incluyendo total fijo): ' + totalAllBatchesPrice + '</div>');
                dataDisplay.append(totalAllBatchesRow);
            }



            // Función para eliminar un lote al hacer clic en el botón "Delete Batch"
            $(document).on('click', '.delete-batch-btn', function() {
                var batchNumber = $(this).data('batch');
                var confirmation = confirm('¿Estás seguro de que quieres eliminar el lote ' + batchNumber + '?');

                if (confirmation) {
                    localStorage.removeItem('itemsData' + batchNumber);
                    updateDataDisplay();
                }
            });


            $('#addToListBtn').click(function() {
                var headerItems = $('.headers-container .row');
                var shielfItems = $('.shielfs-container .row');

                // Imprimir el resultado en la consola
                console.log('El total por lote: ', totalFixed);

                var currentBatchItems = []; // Array para el lote actual
                var itemsByTypeAndSize = {};

                headerItems.each(function() {
                    var headerSize = $(this).find('select[name="headerSize"]').val();
                    var headerSizePi = $(this).find('select[name="headerSizePi"]').val();
                    var quantity = $(this).find('input[name="quantity"]').val();
                    var key = headerSizePi + ' ' + headerSize + ' ' + 'Header'; // Generar clave de tipo y tamaño

                    // Almacenar el artículo en la estructura de datos itemsByTypeAndSize
                    if (!itemsByTypeAndSize[key]) {
                        itemsByTypeAndSize[key] = {
                            type: 'Header',
                            size: key,
                            quantity: 0
                        };
                    }
                    itemsByTypeAndSize[key].quantity += parseInt(quantity); // Actualizar la cantidad

                    currentBatchItems.push({
                        type: 'Header',
                        size: key,
                        quantity: quantity
                    });
                });

                shielfItems.each(function() {
                    var shielfSize = $(this).find('select[name="shielfSize"]').val();
                    var piShielf = $(this).find('select[name="piShielf"]').val();
                    var quantity = $(this).find('input[name="quantity"]').val();
                    var key = piShielf + ' ' + shielfSize + ' ' + 'Shielf'; // Generar clave de tipo y tamaño

                    // Almacenar el artículo en la estructura de datos itemsByTypeAndSize
                    if (!itemsByTypeAndSize[key]) {
                        itemsByTypeAndSize[key] = {
                            type: 'Shielf',
                            size: key,
                            quantity: 0
                        };
                    }
                    itemsByTypeAndSize[key].quantity += parseInt(quantity); // Actualizar la cantidad

                    currentBatchItems.push({
                        type: 'Shielf',
                        size: key,
                        quantity: quantity
                    });
                });


                // Guardar el lote actual en localStorage con una clave diferente para cada lote
                localStorage.setItem('itemsData' + currentBatch, JSON.stringify(currentBatchItems));
                console.log('Lote ' + currentBatch + ': ', currentBatchItems);

                currentBatch++; // Incrementar el contador para el próximo lote
                updateDataDisplay(); // Actualizar la visualización de los datos


                var headerItems = $('.headers-container .row');
                var shielfItems = $('.shielfs-container .row');

                // Restablecer los campos de entrada en headers-container y shielfs-container
                $('.headers-container').empty();
                $('.shielfs-container').empty();

                // Calcular el precio total por lote
                var totalPricePerLote = totalFixed;
                currentBatchItems.forEach(function(item) {
                    var key = item.size;
                    if (preciosPorSeleccion.hasOwnProperty(key)) {
                        totalPricePerLote += preciosPorSeleccion[key] * item.quantity;
                    }
                });

                console.log('El precio total por lote es: ' + totalPricePerLote);

                // Mostrar el desglose de precios por tipo y tamaño
                for (var itemKey in itemsByTypeAndSize) {
                    var item = itemsByTypeAndSize[itemKey];
                    var key = item.size;
                    if (preciosPorSeleccion.hasOwnProperty(key)) {
                        var pricePerItem = preciosPorSeleccion[key];
                        var totalForItem = pricePerItem * item.quantity;
                        console.log('Tipo y tamaño:', item.size, ' Cantidad:', item.quantity, ' Precio por artículo:', pricePerItem, ' Precio total:', totalForItem);
                    }
                }
            });

            // Mostrar los datos al cargar la página
            updateDataDisplay();
        });
        </script>



        <!-- JAVASCRIPT FILES -->
        <script src="./js/jquery.min.js"></script>
        <script src="./js/bootstrap.min.js"></script>
        <script src="./js/jquery.sticky.js"></script>
        <script src="./js/click-scroll.js"></script>
        <script src="./js/jquery.magnific-popup.min.js"></script>
        <script src="./js/magnific-popup-options.js"></script>
        <script src="./js/custom.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>


    </body>
</html>