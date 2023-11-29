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

        let totalAllBatchesPrice = 0; // Variable para almacenar el total de todos los lotes

        for (let i = 1; i < currentBatch; i++) {
            let storedData = JSON.parse(localStorage.getItem('itemsData' + i));

            if (storedData !== null) {
                let totalPricePerBatch = 0;

                storedData.forEach(function(item) {
                    let row = [];
                    row.push(`Type: ${item.type}, ${item.size}, Quantity: ${item.quantity}`);

                    let itemKey = item.size;
                    if (preciosPorSeleccion.hasOwnProperty(itemKey)) {
                        let pricePerItem = preciosPorSeleccion[itemKey];
                        let totalForItem = pricePerItem * item.quantity;

                        row.push(`Precio por ítem: ${pricePerItem.toFixed(2)}`);
                        row.push(`Precio total por ítem: ${totalForItem.toFixed(2)}`);
                    }

                    doc.setFontSize(8); // Tamaño de la fuente más pequeño

                    doc.text(10, y, row.join(', '));
                    y += 10; // Incrementar la posición vertical para la siguiente fila

                    if (y >= pageHeight - 10) { // Si alcanza el límite de la página
                        doc.addPage(); // Agregar una nueva página
                        y = 10; // Reiniciar la posición en el eje Y para la nueva página
                    }
                });

                totalPricePerBatch += totalFixed;

                doc.setFontSize(10); // Restaurar el tamaño de la fuente predeterminado

                doc.text(10, y + 10, `Precio total del lote ${i}: ${totalPricePerBatch.toFixed(2)}`);
                y += 20; // Incrementar la posición vertical para el siguiente lote

                totalAllBatchesPrice += totalPricePerBatch; // Agregar al total de todos los lotes

                if (y >= pageHeight - 20) { // Si alcanza el límite de la página
                    doc.addPage(); // Agregar una nueva página
                    y = 10; // Reiniciar la posición en el eje Y para la nueva página
                }
            }
        }

        doc.text(10, y + 20, `Total de todos los lotes: ${totalAllBatchesPrice.toFixed(2)}`);
        y += 30; // Incrementar la posición vertical para el siguiente elemento

        doc.save('tablas-lotes.pdf');
    };
}

