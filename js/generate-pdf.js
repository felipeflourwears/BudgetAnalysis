function generarPDF(event,
    nameCompany,
    addressCompany,
    phoneCompany,
    businessEmailCompany,
    nameClient,
    addressClient,
    phoneClient,
    emailClient
) {
    event.preventDefault();

    const fields = [
        'name_company',
        'address_company',
        'phone_company',
        'business_email_company',
        'name_client',
        'address_client',
        'phone_client',
        'email_client'
    ];

    let isValid = true;

    fields.forEach(fieldName => {
        const field = document.querySelector(`input[name="${fieldName}"]`);
        if (field) {
            const fieldValue = field.value.trim();
            console.log(`${fieldName}: ${fieldValue}`); // Imprime el valor del campo por consola
            if (!fieldValue) {
                isValid = false;
                console.log(`Field '${fieldName}' is empty.`);
            }
        } else {
            isValid = false; // El campo no se encontró en el DOM
            console.log(`Field '${fieldName}' not found.`);
        }
    });

    console.log(`isValid: ${isValid}`); // Imprime el valor de isValid por consola

    Swal.fire({
        title: 'Are you sure to export the PDF?',
        text: 'You can check your kits in the bottom part of the tables.',
        showCancelButton: true,
        confirmButtonText: 'Generate PDF',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });
        
            const logoImg = new Image();
            logoImg.src = 'images/black.jpg'; // Ruta de tu logo
            logoImg.crossOrigin = 'Anonymous';
        
            logoImg.onload = function() {
                const logoWidth = 88;
                const logoHeight = 25;
                const pageWidth = 210;
                const pageHeight = 297;
                const lineWidth = 150;
                const startX = (pageWidth - logoWidth) / 2;
                const startY = 10;
        
                doc.addImage(this, 'PNG', startX, startY, logoWidth, logoHeight);
                  
                let y = 40; // Posición inicial en el eje Y después del logo (para el texto)
                // Función para agregar texto y manejar la paginación
                const addTextAndAdjustY = (lines, lineHeight) => {
                    lines.forEach(line => {
                        if (y > doc.internal.pageSize.height - 20) {
                            doc.addPage(); // Agregar una nueva página si se excede el límite
                            y = 10; // Reiniciar la posición en el eje Y para la nueva página
                        }
                        doc.text(10, y, line);
                        y += lineHeight; // Incrementar para el siguiente salto de línea
                    });
                };
                const currentDate = new Date().toLocaleDateString('es-MX');
                // Array de encabezados
                const headersArray = [
                    'POP Atelier S.A. de C.V',
                    'RFC: PAT170626UH9',
                    'Address: Avenida Javier Barros Sierra 495. Piso 2, Santa Fé',
                    'Concept: Quotation',
                    `Date: ${currentDate}`
                    // Agrega aquí todos los encabezados que desees
                ];
                doc.setFontSize(10);
                doc.setFontStyle('bold');
                 // Posición inicial en el eje Y después del logo (para los encabezados)
                let yHeader = startY + logoHeight + 20;
                headersArray.forEach(header => {
                    if (yHeader > doc.internal.pageSize.height - 20) {
                        doc.addPage(); // Agregar una nueva página si se excede el límite
                        yHeader = 10; // Reiniciar la posición en el eje Y para la nueva página
                    }
            
                    doc.text(10, yHeader, header);
                    yHeader += 7; // Incremento en la posición vertical para el siguiente encabezado
                });
                
                y += 55;
            
        
                doc.setFontSize(12);
                doc.setFontStyle('normal');
        
        
        
                /* const textLines = doc.splitTextToSize(text, 190); // Ajusta el ancho (190) según tu diseño
                doc.setFontSize(8);
                let textY = startY + logoHeight + 10; // Ajusta la posición inicial del texto
                textLines.forEach(line => {
                    doc.text(10, textY, line);
                    textY += 5; // Incrementa para el siguiente salto de línea
                }); */
        
                // Límite de la página
                const pageLimit1 = doc.internal.pageSize.height - 10;
            
                // Lógica para verificar si hay suficiente espacio en la página actual para "KITS"
                    const hasEnoughSpaceForMandotory = y + 100 < pageLimit1; // Cambia 100 según sea necesario
            
                if (!hasEnoughSpaceForMandotory) {
                    doc.addPage(); // Agregar nueva página si no hay suficiente espacio
                    y = 10; // Reiniciar la posición en el eje Y para la nueva página
                }

               // Estilo para "Kit requirements"
               const kitRequirementsHeader = 'Mandatory KIT:';
        
               doc.setFontSize(12);
               doc.setFontStyle('bold');
               doc.text(10, y, kitRequirementsHeader);
               let yIncrement = 15; // Incremento en la posición vertical para el contenido
               y += 5
               
               // Dibujar una línea decorativa
               doc.setLineWidth(0.2); // Ancho de la línea
               doc.setDrawColor(0); // Color de la línea (negro)
               doc.line(10, y, 10 + lineWidth, y); // Dibujar línea horizontal
               y += 10; // Incrementar la posición vertical después de la línea
        
               const requerimientosTexto = "- VIDEO PROCESOR + 4G CARD: $ 377.99\n- FREIGTH + IMPORT TAXES: $ 487.20\n- INSTALL: $ 931.02\n- CMS ANUAL FEE: $ 152.10\n- NOC + CELL DATA ANUAL FEE: $ 152.10\n- TOTAL: $ 2,668.31";
        
               const requerimientosLines = doc.splitTextToSize(requerimientosTexto, 190);
               doc.setFontSize(8);
        
               addTextAndAdjustY(requerimientosLines, 8);
        
            // Límite de la página
            const pageLimit = doc.internal.pageSize.height - 10;
        
            // Lógica para verificar si hay suficiente espacio en la página actual para "KITS"
                const hasEnoughSpaceForKits = y + 100 < pageLimit; // Cambia 100 según sea necesario
        
            if (!hasEnoughSpaceForKits) {
                doc.addPage(); // Agregar nueva página si no hay suficiente espacio
                y = 10; // Reiniciar la posición en el eje Y para la nueva página
            }
            
                // Dibujar una línea decorativa
                doc.setLineWidth(0.2); // Ancho de la línea
                doc.setDrawColor(0); // Color de la línea (negro)
                doc.line(10, y, 10 + lineWidth, y); // Dibujar línea horizontal
                y += 5;

                const kitsHeader = 'KITS:';
                doc.setFontSize(12);
                doc.setFontStyle('bold');
                doc.text(10, y, kitsHeader);
                let yIncrement2 = 15; // Incremento en la posición vertical para el contenido
                y += 5;
        
                // Dibujar una línea decorativa
                const lineWidth2 = 150;
                doc.setLineWidth(0.2); // Ancho de la línea
                doc.setDrawColor(0); // Color de la línea (negro)
                doc.line(10, y, 10 + lineWidth2, y); // Dibujar línea horizontal
                y += 4; // Incrementar la posición vertical después de la línea
        
                //LOGIC
                let totalAllBatchesPrice = 0; // Variable para almacenar el total de todos los lotes
                var cantidadLotes = 0; // Inicializar la cantidad de lotes
        
                for (let i = 1; i < currentBatch; i++) {
                    let storedData = JSON.parse(localStorage.getItem('itemsData' + i));
                    cantidadLotes++;
                    if (storedData !== null) {
                        let totalPricePerBatch = 0;
        
                        // Calcular el precio total del lote actual
                        storedData.forEach(function(item) {
                            let itemKey = item.size;
                            if (preciosPorSeleccion.hasOwnProperty(itemKey)) {
                                let pricePerItem = preciosPorSeleccion[itemKey];
                                let totalForItem = pricePerItem * item.quantity;
                                totalPricePerBatch += totalForItem;
                            }
                        });
        
                        totalPricePerBatch += totalFixed;
        
                        // Mostrar el precio total del lote
                        doc.setFontSize(10);
                        doc.text(10, y + 10, `Total Price Kit ${i}: $${totalPricePerBatch.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
                        y += 20; // Incrementar la posición vertical para el siguiente lote
        
                        // Mostrar los elementos del lote con sus precios individuales
                        storedData.forEach(function(item) {
                            let row = [];
                            // Obtiene la cadena sin los últimos 6 dígitos
                            const sizeWithoutLastSix = item.size.substring(0, item.size.length - 6);
                            row.push(`Quantity: ${item.quantity} , ${item.type}, ${sizeWithoutLastSix}`);
        
                            let itemKey = item.size;
                            if (preciosPorSeleccion.hasOwnProperty(itemKey)) {
                                let pricePerItem = preciosPorSeleccion[itemKey];
                                let totalForItem = pricePerItem * item.quantity;
        
                                row.push(`Price per item: $ ${pricePerItem.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
                                row.push(`Total price per item: $ ${totalForItem.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);                                
                            }
        
                            doc.setFontSize(8); // Reducir tamaño de fuente
                            doc.text(10, y, row.join(', '));
                            y += 10; // Incrementar la posición vertical para la siguiente fila
        
                            if (y >= pageHeight - 10) { // Si alcanza el límite de la página
                                doc.addPage(); // Agregar una nueva página
                                y = 10; // Reiniciar la posición en el eje Y para la nueva página
                            }
                        });

                        // Dibujar una línea decorativa
                        doc.setLineWidth(0.2); // Ancho de la línea
                        doc.setDrawColor(0); // Color de la línea (negro)
                        doc.line(10, y, 10 + lineWidth2, y); // Dibujar línea horizontal
            
                        totalAllBatchesPrice += totalPricePerBatch; // Agregar al total de todos los lotes
        
                        if (y >= pageHeight - 20) { // Si alcanza el límite de la página
                            doc.addPage(); // Agregar una nueva página
                            y = 10; // Reiniciar la posición en el eje Y para la nueva página
                        }
                    }
                }
                // Calcular el descuento basado en el precio total de todos los lotes
                var descuentoTotal = calcularDescuentoPorLotes(cantidadLotes);
                console.log("Cantidad de lotes: ", cantidadLotes)

                doc.setFontSize(12);
                doc.text(10, y + 10, `Total KITs: ${cantidadLotes}`);
                if(cantidadLotes > 150){
                    doc.text(10, y + 15, `Total Discount: $ ${descuentoTotal.toFixed(2) * totalAllBatchesPrice}`);
                }
                doc.setFontSize(12);
                doc.text(10, y + 20, `Total of all KITs: $ ${totalAllBatchesPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
                y += 10; // Incrementar la posición vertical para el siguiente elemento
                doc.setFontStyle('bold');
                if(cantidadLotes > 150){
                    doc.text(10, y + 20, `Final Price with discount: $ ${(totalAllBatchesPrice - descuentoTotal.toFixed(2) * totalAllBatchesPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
                }
                y += 30; // Incrementar la posición vertical para el siguiente elemento
                // Dibujar una línea decorativa
                doc.setLineWidth(0.2); // Ancho de la línea
                doc.setDrawColor(0); // Color de la línea (negro)
                doc.line(10, y, 10 + lineWidth2, y); // Dibujar línea horizontal
        
                doc.save('budget-popatelier.pdf');
            };
        }
    });
}


    