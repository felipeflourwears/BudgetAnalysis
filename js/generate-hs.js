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

$(document).ready(function() {
    $('#addHeaderBtn').click(function() {
        var newHeader = `
            <div class="row">
                <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                    <div class="form-group">
                        <label class="bmd-label-floating">Select header size:</label>
                        <select class="form-control" name="headerSize">
                            <option value="120">4' (120 cm)</option>
                            <option value="90">3' (90 cm)</option>
                            <option value="60">2' (60 cm)</option>
                            <option value="45">1.5' (45 cm)</option>
                        </select>
                    </div>
                </div>
                <div class="col-6 col-md-6">
                    <div class="form-group">
                        <label class="bmd-label-floating">Select pitch(screen resolution):</label>
                        <div class="input-group">
                            <select class="form-control" name="headerSizePi">
                                <option value="P2">2</option>
                                <option value="P1.8">1.8</option>
                                <option value="P1.5">1.5</option>
                                <option value="P1.2">1.2</option>
                            </select>
                            &nbsp;&nbsp;
                            <span class="input-group-btn">
                                <button type="button" class="btn btn-danger btn-number" data-type="minus" data-field="quantity">
                                    <span class="glyphicon glyphicon-minus">-</span>
                                </button>
                            </span>
                            &nbsp;
                            <label class="bmd-label-floating">Quantity:</label>
                            &nbsp;
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



//Shelfs
$(document).ready(function() {
    $('#addShielfBtn').click(function() {
        var newShielf = `
            <div class="row">
                <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                    <div class="form-group">
                        <label class="bmd-label-floating">Select shelf size:</label>
                        <select class="form-control shielf-size" name="shielfSize">
                            <option value="120">4' (120 cm)</option>
                            <option value="90">3' (90 cm)</option>
                            <option value="60">2' (60 cm)</option>
                            <option value="45">1.5' (45 cm)</option>
                        </select>
                    </div>
                </div>
                <div class="col-6 col-md-6">
                    <div class="form-group">
                        <label class="bmd-label-floating">Select pitch(screen resolution):</label>
                        <div class="input-group">
                            <select class="form-control pi-shielf" name="piShielf">
                                <option value="P1.8">1.8</option>
                                <option value="P1.57">1.57</option>
                                <option value="P1.2">1.2</option>
                            </select>
                            &nbsp;&nbsp;
                            <span class="input-group-btn">
                                <button type="button" class="btn btn-danger btn-number" data-type="minus" data-field="quantity">
                                    <span class="glyphicon glyphicon-minus">-</span>
                                </button>
                            </span>
                            &nbsp;
                            <label class="bmd-label-floating">Quantity:</label>
                            &nbsp;
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