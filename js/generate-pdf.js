// Comprueba si hay suficiente espacio para añadir contenido y, si no, agrega una nueva página y reinicia la posición vertical
function checkSpaceAndAddPage(doc, y, requiredSpace) {
    const pageHeight = doc.internal.pageSize.height;
    const pageLimit = pageHeight - 20; // Límite de altura de la página
    if (y + requiredSpace > pageLimit) {
      doc.addPage();
      return 10; // Reinicia la posición en el eje Y para la nueva página
    }
    return y;
  }

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
                const logoHeight = 22;
                const pageWidth = 210;
                const pageHeight = 297;
                const lineWidth = 180;
                const lineWidthFinal = 180;
                const startX = (pageWidth - logoWidth) / 2;
                const startY = 10;
                const priceMandatory= 2668.31;
                let requiredSpace = 70;
                let requiredSpace2 = 35;
        
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
                    'POP Atelier LLC',
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
    
                
                doc.setLineWidth(0.2); // Ancho de la línea
                doc.setDrawColor(0); // Color de la línea (negro)
                doc.line(10, y, 10 + lineWidth, y); // Dibujar línea horizontal
                y += 2; // Incrementar la posición vertical después de la línea
        
                //LOGIC
                let totalAllBatchesPrice = 0; // Variable para almacenar el total de todos los lotes
                var cantidadLotes = 0; // Inicializar la cantidad de lotes
                //Contador de lotes
                let contKits = 0;
                let contBatch = 0;
                let kitsprice = 0;
                let toption = 0;

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
                        totalPricePerBatch = totalPricePerBatch - priceMandatory;
                    

                        // Mostrar el precio total del lote
                        doc.setFontSize(10);
                        
                        //doc.text(10, y + 10, `Total Price Kit ${i}: $${totalPricePerBatch.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
                        doc.text(10, y + 10, `Option ${i}:`);
                        y += 20; // Incrementar la posición vertical para el siguiente lote
                        let totalPricePerBatchFormatted = totalPricePerBatch.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        
                        // Mostrar los elementos del lote con sus precios individuales
                        storedData.forEach(function(item) {
                            let row = [];
                            // Obtiene la cadena sin los últimos 6 dígitos
                            if (item.type === "TOTAL KITS") {
                                row.push(`Total KITS: ${item.quantity}`);
                                contKits += parseInt(item.quantity);
                                console.log("UDSAODSADSA");
                                console.log(totalPricePerBatch , parseInt(item.quantity));
                                totalPricePerBatchFormatted = totalPricePerBatch * parseInt(item.quantity);
                                doc.text(10, y + 10, `Total Items:                 $${totalPricePerBatchFormatted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
                                contBatch += totalPricePerBatchFormatted;
                                y+=9
                                kitsprice = item.quantity * priceMandatory
                                doc.text(10, y + 10, `Total Price KITS:         $${kitsprice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
                                y+=20
                                toption = kitsprice + totalPricePerBatchFormatted
                                doc.text(10, y + 10, `Total Option:               $${toption.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
                                y+=5

                                y = checkSpaceAndAddPage(doc, y, requiredSpace2);

                            }else {
                                // Agregar lógica para obtener la variable sizeWithoutLastSix
                                var sizeWithoutLastSix = item.size.slice(0, -6); // Esto asume que sizeWithoutLastSix se obtiene de alguna manera
                                row.push(`Quantity: ${item.quantity}, ${item.type}, ${sizeWithoutLastSix}`);
                            }
                           
                            let itemKey = item.size;
                            if (preciosPorSeleccion.hasOwnProperty(itemKey)) {
                                let pricePerItem = preciosPorSeleccion[itemKey];
                                let totalForItem = pricePerItem * item.quantity;
                                //row.push(`          `);
                                //row.push(`                                                                  `);
                                row.push(`Price per item: $ ${pricePerItem.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
                                row.push(`Total price per item: $ ${totalForItem.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);                                
                            }
        
                            doc.setFontSize(8); // Reducir tamaño de fuente
                            doc.text(10, y, row.join(' '));
                            y += 5; // Incrementar la posición vertical para la siguiente fila
        
                            if (y >= pageHeight - 10) { // Si alcanza el límite de la página
                                doc.addPage(); // Agregar una nueva página
                                y = 10; // Reiniciar la posición en el eje Y para la nueva página
                            }
                        });
                        y += 5;
                        
                        // Dibujar una línea decorativa
                        doc.setLineWidth(0.2); // Ancho de la línea
                        doc.setDrawColor(0); // Color de la línea (negro)
                        doc.line(10, y, 10 + lineWidth, y); // Dibujar línea horizontal
            
                        totalAllBatchesPrice += totalPricePerBatch; // Agregar al total de todos los lotes
        
                        if (y >= pageHeight - 20) { // Si alcanza el límite de la página
                            doc.addPage(); // Agregar una nueva página
                            y = 10; // Reiniciar la posición en el eje Y para la nueva página
                        }
                    }
                }
                console.log("CONTADOR:", contKits)
                console.log("CONTADOR2: ", contBatch)


                // Calcular el descuento basado en el precio total de todos los lotes
                var descuentoTotal = calcularDescuentoPorLotes(contKits);
                console.log('Descuento total:', descuentoTotal); 
                

                doc.setFontSize(12);
                //doc.text(10, y + 10, `Total Selection's: ${contKits}`);
                //y+=5
                doc.text(10, y + 10, `Total Mandatory KITS: ${contKits}`);
                y+=30
                

                let totalFinal = contKits * priceMandatory + contBatch;
                let totalDiscount = descuentoTotal * totalFinal
                let totalFinalDLF = contKits * priceMandatory + contBatch - totalDiscount 
                // Dibujar una línea decorativa
                doc.setLineWidth(0.2); // Ancho de la línea
                doc.setDrawColor(0); // Color de la línea (negro)
                doc.line(10, y, 10 + lineWidthFinal, y); // Dibujar línea horizontal

                doc.text(10, y + 10, `Total Price Mandatory KITS:       $ ${(contKits * priceMandatory).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
                y+= 5;
                
                y = checkSpaceAndAddPage(doc, y, requiredSpace);

                const hasEnoughSpaceForMandotoryP = y + 70 < pageLimit1; // Cambia 100 según sea necesario

                doc.text(10, y + 20, `Total of all KITs:                           $ ${(contBatch).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
                y += 30; // Incrementar la posición vertical para el siguiente elemento
            
                if (!hasEnoughSpaceForMandotoryP) {
                     doc.addPage(); // Agregar nueva página si no hay suficiente espacio
                     y = 10; // Reiniciar la posición en el eje Y para la nueva página
                }

                if(contKits > 500){
                    doc.text(10, y + 10, `Discount:                                     - $ ${(totalDiscount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
                    y+= 20;
                    doc.text(10, y + 20, `Final Price with discount:            $ ${(totalFinalDLF).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
                    y+=10;
                    const hasEnoughSpaceForMandotory2 = y + 20 < pageLimit1; // Cambia 100 según sea necesario
            
                    if (!hasEnoughSpaceForMandotory2) {
                        doc.addPage(); // Agregar nueva página si no hay suficiente espacio
                        y = 10; // Reiniciar la posición en el eje Y para la nueva página
                    }
                }
                doc.setFontSize(12);
                doc.setFontStyle('bold');
                
               

                if(contKits > 500){
                    console.log("Descuento")
                }else {
                     // Lógica para verificar si hay suficiente espacio en la página actual para "KITS"
                    const hasEnoughSpaceForMandotory2 = y + 30 < pageLimit1; // Cambia 100 según sea necesario
                
                    if (!hasEnoughSpaceForMandotory2) {
                        doc.addPage(); // Agregar nueva página si no hay suficiente espacio
                        y = 10; // Reiniciar la posición en el eje Y para la nueva página
                    }
                    doc.setFontSize(12);
                    doc.text(10, y + 20, `Total Final:                                    $ ${totalFinal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
                }
                y += 25; // Incrementar la posición vertical para el siguiente elemento
                // Dibujar una línea decorativa
                doc.setLineWidth(0.2); // Ancho de la línea
                doc.setDrawColor(0); // Color de la línea (negro)
                doc.line(10, y, 10 + lineWidth, y); // Dibujar línea horizontal
        
                doc.save('budget-popatelier.pdf');
            };
        }
    });
}


    