import React, { useState, useEffect } from 'react';
import { getPrinters } from '../utils/printnode';

const PrinterList = ({ onSelectPrinter }) => {
  const [printers, setPrinters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrinters = async () => {
      try {
        const data = await getPrinters();
        setPrinters(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching printers:', err);
        setError('Error al cargar impresoras. Por favor, verifica tu conexión y API key.');
        setPrinters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPrinters();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Tus Impresoras</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Selecciona una impresora para enviar tu documento</p>
      </div>
      <ul className="divide-y divide-gray-200">
        {printers && printers.length > 0 ? (
          printers.map((printer) => (
            <li key={printer.id}>
              <button
                onClick={() => onSelectPrinter(printer)}
                className="w-full text-left px-4 py-4 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
              >
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1 flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1 px-4">
                      <div>
                        <p className="text-sm font-medium text-indigo-600 truncate">{printer.name}</p>
                        <p className="text-sm text-gray-500 truncate">{printer.description || 'Sin descripción'}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </button>
            </li>
          ))
        ) : (
          <li className="px-4 py-4 text-center text-sm text-gray-500">
            No se encontraron impresoras disponibles
          </li>
        )}
      </ul>
    </div>
  );
};

export default PrinterList;

// DONE