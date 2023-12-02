// Obtén una referencia al botón
const botonGenerarPDF = document.getElementById('btn-generar');

// Agrega un evento 'click' al botón
botonGenerarPDF.addEventListener('click', function(event) {
    // Obtén los valores de los campos
    const nameCompany = document.querySelector('input[name="name_company"]').value.trim();
    const addressCompany = document.querySelector('input[name="address_company"]').value.trim();
    const phoneCompany = document.querySelector('input[name="phone_company"]').value.trim();
    const businessEmailCompany = document.querySelector('input[name="business_email_company"]').value.trim();
    const nameClient = document.querySelector('input[name="name_client"]').value.trim();
    const addressClient = document.querySelector('input[name="address_client"]').value.trim();
    const phoneClient = document.querySelector('input[name="phone_client"]').value.trim();
    const emailClient = document.querySelector('input[name="email_client"]').value.trim();

    // Llama a la función generarPDF pasando el objeto del evento y los valores de los campos
    generarPDF(event, nameCompany, addressCompany, phoneCompany, businessEmailCompany, nameClient, addressClient, phoneClient, emailClient);
});


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
            logoImg.src = 'images/logo.png'; // Ruta de tu logo
            logoImg.crossOrigin = 'Anonymous';
        
            logoImg.onload = function() {
                const logoWidth = 90;
                const logoHeight = 30;
                const pageWidth = 210;
                const pageHeight = 297;
        
                const startX = (pageWidth - logoWidth) / 2;
                const startY = 10;
        
                doc.addImage(this, 'PNG', startX, startY, logoWidth, logoHeight);
        
                const text = [
                    "We kindly request your prior approval for the budget information provided. Please note that these costs may fluctuate based",
                    "on market demand. Our gratitude extends in part to PopAtelier for their invaluable contributions. This budget is an estimate,",
                    "but rest assured that our team remains accessible to ensure the seamless scalability of our products.",
                    "With gratitude for PopAtelier ®'s invaluable assistance."
                  ];
                  
                  let y = 70; // Posición inicial en el eje Y después del logo (para el texto)
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
        
        
                  doc.setFontSize(10);
                  text.forEach(line => {
                    doc.text(10, y, line);
                    y += 7; // Incrementa para el siguiente salto de línea
                  });          
        
                // Información de la compañía
                const companyData = `
                ___________________________________________________________
                Data Company:
                Company: ${nameCompany}
                Address: ${addressCompany}
                Phone Company: ${phoneCompany}
                Email company: ${businessEmailCompany}
                Date: ${new Date().toLocaleDateString()}
                ___________________________________________________________
                `;
        
                // Información del cliente
                const clientData = `
                Data Client:
                Name: ${nameClient}
                Address: ${addressClient}
                Phone: ${phoneClient}
                Email Client: ${emailClient}
                ___________________________________________________________
                `;
        
                doc.setFontSize(12);
        
                // Agregar al documento la información de la compañía
                doc.text(10, y, companyData);
                y += 40; // Incrementar la posición vertical para la siguiente sección
        
                // Agregar al documento la información del cliente
                doc.text(10, y, clientData);
                y += 70;
        
        
        
                /* const textLines = doc.splitTextToSize(text, 190); // Ajusta el ancho (190) según tu diseño
                doc.setFontSize(8);
                let textY = startY + logoHeight + 10; // Ajusta la posición inicial del texto
                textLines.forEach(line => {
                    doc.text(10, textY, line);
                    textY += 5; // Incrementa para el siguiente salto de línea
                }); */
        
        
               // Estilo para "Kit requirements"
               const kitRequirementsHeader = 'Mandatory KIT:';
        
               doc.setFontSize(12);
               doc.setFontStyle('bold');
               doc.text(10, y, kitRequirementsHeader);
               let yIncrement = 15; // Incremento en la posición vertical para el contenido
               y += 5
               // Dibujar una línea decorativa
               const lineWidth = 150;
               doc.setLineWidth(0.2); // Ancho de la línea
               doc.setDrawColor(0); // Color de la línea (negro)
               doc.line(10, y, 10 + lineWidth, y); // Dibujar línea horizontal
               y += 10; // Incrementar la posición vertical después de la línea
        
               const requerimientosTexto = "- VIDEO PROCESOR + 4G CARD: $ 377.99\n- FREIGTH + IMPORT TAXES: $ 487.20\n- INSTALL: $ 931.02\n- CMS ANUAL FEE: $ 152.10\n- NOC + CELL DATA ANUAL FEE: $ 152.10\n- TOTAL Requirements: $ 2.668.31";
        
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
                        doc.text(10, y + 10, `Total Price Kit ${i}: ${totalPricePerBatch.toFixed(2)}`);
                        y += 20; // Incrementar la posición vertical para el siguiente lote
        
                        // Mostrar los elementos del lote con sus precios individuales
                        storedData.forEach(function(item) {
                            let row = [];
                            row.push(`Quantity: ${item.quantity} , ${item.type}, ${item.size}`);
        
                            let itemKey = item.size;
                            if (preciosPorSeleccion.hasOwnProperty(itemKey)) {
                                let pricePerItem = preciosPorSeleccion[itemKey];
                                let totalForItem = pricePerItem * item.quantity;
        
                                row.push(`Price per item: ${pricePerItem.toFixed(2)}`);
                                row.push(`Total price per item: ${totalForItem.toFixed(2)}`);
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
                doc.setFontSize(14);
                doc.text(10, y + 10, `Total KITs: ${cantidadLotes}`);
                doc.text(10, y + 15, `Total Discount: $ ${descuentoTotal.toFixed(2) * totalAllBatchesPrice}`);
        
                doc.setFontSize(14);
                doc.text(10, y + 20, `Total of all KITs: $ ${totalAllBatchesPrice.toFixed(2)}`);
                y += 30; // Incrementar la posición vertical para el siguiente elemento
                doc.text(10, y + 20, `Final Price with discount: $ ${totalAllBatchesPrice - descuentoTotal.toFixed(2) * totalAllBatchesPrice}`);
                y += 30; // Incrementar la posición vertical para el siguiente elemento
        
        
                doc.save('budget-popatelier.pdf');
            };
        }
    });
}


    