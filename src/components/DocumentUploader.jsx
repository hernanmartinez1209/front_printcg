import React, { useState } from 'react';

const DocumentUploader = ({ onDocumentSelect }) => {
  const [document, setDocument] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const documentUrl = URL.createObjectURL(file);
    setDocument({ file, url: documentUrl });
    onDocumentSelect({ file, url: documentUrl });
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Documento a Imprimir</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Sube el documento que deseas imprimir</p>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
              >
                <span>Sube un archivo</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                />
              </label>
              <p className="pl-1">o arrástralo aquí</p>
            </div>
            <p className="text-xs text-gray-500">PDF</p>
          </div>
        </div>
        {document && (
          <div className="mt-4 flex items-center">
            <svg
              className="flex-shrink-0 h-5 w-5 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="ml-2 text-sm font-medium text-gray-900">
              {document.file.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUploader;