import { useState } from 'react';
import PrinterList from './components/PrinterList';
import DocumentUploader from './components/DocumentUploader';
import PrintControls from './components/PrintControls';
import { ConverterRawPdf } from './components/ConverterRawPdf';

const App = () => {
  const [selectedPrinter, setSelectedPrinter] = useState(null);
  const [document, setDocument] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            PrintNode Master
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Controla tus impresoras remotas con facilidad
          </p>
        </div>

        <div className="space-y-6">
          <ConverterRawPdf />
          <DocumentUploader onDocumentSelect={setDocument} />
          <PrinterList onSelectPrinter={setSelectedPrinter} />
          {selectedPrinter && document && (
            <PrintControls selectedPrinter={selectedPrinter} document={document} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
