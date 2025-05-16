import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { emailConfig } from '../mock/emailConfig';

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    pages: 1,
    details: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [submitted, setSubmitted] = useState(false);

  const calculateTotal = () => formData.pages * 25;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      client_name: formData.clientName,
      client_email: formData.clientEmail,
      pages: formData.pages,
      details: formData.details,
      date: formData.date,
      total: `$${calculateTotal()}.00`,
    };

    emailjs
      .send(
        emailConfig.serviceID,
        emailConfig.templateID,
        templateParams,
        emailConfig.userID
      )
      .then((response) => {
        console.log('Correo enviado:', response.status, response.text);
        setSubmitted(true);
      })
      .catch((error) => {
        console.error('Error al enviar el correo:', error);
        alert('Error al enviar la factura. Intenta nuevamente.');
      });
  };

  const handleDownload = () => {
    const invoiceText = `
Factura de Servicios de Impresión
----------------------------------
Cliente: ${formData.clientName}
Email: ${formData.clientEmail}
Fecha: ${formData.date}

Detalles:
${formData.details}

Resumen:
Hojas impresas: ${formData.pages}
Precio por hoja: $25.00
Total a pagar: $${calculateTotal()}.00
    `;

    const blob = new Blob([invoiceText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `factura_${formData.clientName}_${formData.date}.txt`;
    link.click();
  };

  if (submitted) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold text-green-600 mb-4">
          ¡Factura Generada y Enviada!
        </h2>
        <div className="mb-4 text-gray-700 text-sm">
          <p><strong>Cliente:</strong> {formData.clientName}</p>
          <p><strong>Email:</strong> {formData.clientEmail}</p>
          <p><strong>Total:</strong> ${calculateTotal()}.00</p>
        </div>
        <button
          onClick={handleDownload}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
        >
          Descargar Factura
        </button>
        <button
          onClick={() => setSubmitted(false)}
          className="w-full mt-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded"
        >
          Crear Nueva Factura
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
      <h2 className="text-sm text-gray-500 mb-4">Generar Factura</h2>

      <label className="block text-sm text-gray-700 mb-2">Nombre del Cliente *</label>
      <input
        type="text"
        name="clientName"
        value={formData.clientName}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        required
      />

      <label className="block text-sm text-gray-700 mb-2">Email del Cliente *</label>
      <input
        type="email"
        name="clientEmail"
        value={formData.clientEmail}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        required
      />

      <label className="block text-sm text-gray-700 mb-2">Hojas a Imprimir *</label>
      <input
        type="number"
        name="pages"
        min="1"
        value={formData.pages}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        required
      />

      <label className="block text-sm text-gray-700 mb-2">Nombre de Razón Social y RTN</label>
      <textarea
        name="details"
        value={formData.details}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        rows="3"
      />

      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-2">Fecha</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-6 text-gray-700 text-sm">
        <p>Total a pagar:</p>
        <div className="text-2xl font-bold text-indigo-600">${calculateTotal()}.00</div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
      >
        Generar Factura
      </button>
    </form>
  );
};

export default InvoiceForm;
