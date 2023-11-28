<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <meta name="description" content="">
        <meta name="author" content="TemplateMo">

        <title>Landing Page</title>

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

        <form action="budget-back.php" method="POST">
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
                    </div>
                </main>
            </div>
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
            $(document).ready(function() {$('#addToListBtn').click(function() {
                    var items = $('.headers-container .row'); // Obtener todos los grupos de inputs
                    itemsData = []; // Limpiar datos anteriores

                    items.each(function(index) {
                        var headerSize = $(this).find('select[name="headerSize"]').val();
                        var headerSizePi = $(this).find('select[name="headerSizePi"]').val();
                        var quantity = $(this).find('input[name="quantity"]').val();

                        itemsData.push({
                            id: index + 1,
                            headerSize: headerSize,
                            headerSizePi: headerSizePi,
                            quantity: quantity
                        });
                    });

                    console.log(itemsData); // Muestra los datos en la consola (puedes enviarlos al servidor o realizar otras operaciones aquí)
                });
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