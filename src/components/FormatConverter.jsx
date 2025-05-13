import  { useState } from 'react';

const FormatConverter = ({ file, onConversion }) => {
  const [targetFormat, setTargetFormat] = useState('pdf');
  const [isConverting, setIsConverting] = useState(false);

  const handleConvert = async () => {
    if (!file) return;
    
    setIsConverting(true);
    
    // Simular conversión de archivo
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const convertedFile = {
      name: file.name.replace(/\.[^/.]+$/, '') + '.' + targetFormat,
      size: file.size * 0.8, // Simular reducción de tamaño
      lastModified: new Date(),
      type: `application/${targetFormat}`
    };
    
    setIsConverting(false);
    onConversion(convertedFile);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Convertir Archivo</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
            {file?.type.split('/')[1] || 'desconocido'}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <select
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={targetFormat}
            onChange={(e) => setTargetFormat(e.target.value)}
          >
            <option value="pdf">PDF</option>
            <option value="docx">Word</option>
            <option value="xlsx">Excel</option>
          </select>
        </div>
        <button
          onClick={handleConvert}
          disabled={!file || isConverting}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            !file || isConverting
              ? 'bg-indigo-300 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isConverting ? 'Convirtiendo...' : 'Convertir Archivo'}
        </button>
      </div>
    </div>
  );
};

export default FormatConverter;