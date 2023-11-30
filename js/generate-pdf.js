function generarPDF(event) {
    event.preventDefault();

    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    const logoImg = new Image();
    logoImg.src = 'images/pop.png'; // Ruta de tu logo
    logoImg.crossOrigin = 'Anonymous';

    logoImg.onload = function() {
        const logoWidth = 50;
        const logoHeight = 50;
        const pageWidth = 210;
        const pageHeight = 297;

        const startX = (pageWidth - logoWidth) / 2;
        const startY = 10;

        doc.addImage(this, 'PNG', startX, startY, logoWidth, logoHeight);

        let y = 80; // Posición inicial en el eje Y después del logo

        doc.setFontSize(8);


        const text = "The budget information requires prior approval; this amount may change according to high demand. All of this, partly thanks to PopAtelier company. This budget is an approximation, but the contact will always be available to ensure the correct scalability of all our products. Partly thanks to PopAtelier ®";

        const textLines = doc.splitTextToSize(text, 190); // Ajusta el ancho (190) según tu diseño
        doc.setFontSize(8);
        let textY = startY + logoHeight + 10; // Ajusta la posición inicial del texto
        textLines.forEach(line => {
            doc.text(10, textY, line);
            textY += 5; // Incrementa para el siguiente salto de línea
        });
        doc.setFontSize(12);
         // Mostrar los requerimientos por kit
        const requerimientosTexto = "Kit requirements:\n- VIDEO PROCESOR + 4G CARD: $ 377.99\n- FREIGTH + IMPORT TAXES: $ 487.20\n- INSTALL: $ 931.02\n- CMS ANUAL FEE: $ 152.10\n- NOC + CELL DATA ANUAL FEE: $ 152.10\n\n- TOTAL Requirements: $ 2.668.31"; 

        const requerimientosLines = doc.splitTextToSize(requerimientosTexto, 190); // Ajusta el ancho (190) según tu diseño
        doc.setFontSize(8);
        requerimientosLines.forEach(line => {
            doc.text(10, y, line);
            y += 8; // Incrementa para el siguiente salto de línea
        });



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
                    row.push(`Type: ${item.type}, ${item.size}, Quantity: ${item.quantity}`);

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