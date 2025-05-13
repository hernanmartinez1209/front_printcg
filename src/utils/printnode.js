const API_KEY = 'cjY7_cVqh1tDtEjUpo6eJIVFf_3ojUnBuQse6-WMFs4'; // Asegúrate de proteger esto en producción

// Exporta la función para obtener las impresoras
export async function getPrinters() {
  try {
    const response = await fetch('https://api.printnode.com/printers', {
      headers: {
        'Authorization': 'Basic ' + btoa(API_KEY + ':'),
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener impresoras');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error en getPrinters:', err);
    return [];
  }
}

// Exporta la función para imprimir documentos
export const printDocument = async (printerId, fileUrl) => {
  try {
    const fileBlob = await fetch(fileUrl).then(res => res.blob());
    const fileBuffer = await fileBlob.arrayBuffer();
    const fileBase64 = btoa(
      new Uint8Array(fileBuffer)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );

    const response = await fetch('https://api.printnode.com/printjobs', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(API_KEY + ':'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        printerId: printerId,
        title: 'Documento desde React',
        contentType: 'pdf_base64',
        content: fileBase64,
        source: 'React App'
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('PrintNode error:', error);
      return { error: true };
    }

    return { error: false };
  } catch (err) {
    console.error('Print error:', err);
    return { error: true };
  }
};
