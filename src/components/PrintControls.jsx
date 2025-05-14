import React, { useState } from 'react';
import { printDocument } from '../utils/printnode';

const PrintControls = ({ selectedPrinter, document }) => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [printStatus, setPrintStatus] = useState(null);
  const [copies, setCopies] = useState(1);

  const handlePrint = async () => {
    if (!selectedPrinter || !document || copies < 1) return;

    setIsPrinting(true);
    setPrintStatus(null);

    const result = await printDocument(selectedPrinter.id, document.url, copies);

    setIsPrinting(false);
    setPrintStatus(result.error ? 'error' : 'success');
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Opciones de Impresión</h3>

        <div className="mt-4">
          <label htmlFor="copies" className="block text-sm font-medium text-gray-700">
            Cantidad de copias
          </label>
          <input
            id="copies"
            type="number"
            min="1"
            value={copies}
            onChange={(e) => setCopies(parseInt(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mt-4">
          <button
            onClick={handlePrint}
            disabled={!selectedPrinter || !document || isPrinting || copies < 1}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              !selectedPrinter || !document || isPrinting || copies < 1
                ? 'bg-indigo-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isPrinting ? 'Enviando a imprimir...' : 'Imprimir Documento'}
          </button>
        </div>

        {printStatus === 'success' && (
          <div className="mt-4 bg-green-50 border-l-4 border-green-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">Documento enviado a la impresora correctamente</p>
              </div>
            </div>
          </div>
        )}

        {printStatus === 'error' && (
          <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">Error al enviar el documento a imprimir</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrintControls;
