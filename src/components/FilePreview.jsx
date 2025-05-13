import React from 'react';

const FilePreview = ({ file }) => {
  if (!file) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
        <p className="text-gray-500">Selecciona un archivo para previsualizar</p>
      </div>
    );
  }

  const fileType = file.type.split('/')[1];

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">{file.name}</h3>
        <p className="text-sm text-gray-500">
          {file.size / 1000} KB · {fileType.toUpperCase()}
        </p>
      </div>
      <div className="p-4 flex items-center justify-center h-64 relative">
        {fileType === 'pdf' && (
          <div className="w-full h-full bg-red-50 flex flex-col items-center justify-center p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <span className="mt-2 text-red-800">Vista previa PDF</span>
          </div>
        )}
        {['docx', 'doc'].includes(fileType) && (
          <div className="w-full h-full bg-blue-50 flex flex-col items-center justify-center p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="mt-2 text-blue-800">Vista previa Word</span>
          </div>
        )}
        {['xlsx', 'xls'].includes(fileType) && (
          <div className="w-full h-full bg-green-50 flex flex-col items-center justify-center p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="mt-2 text-green-800">Vista previa Excel</span>
          </div>
        )}
        {['jpg', 'jpeg', 'png', 'gif'].includes(fileType) && (
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="max-h-full max-w-full object-contain"
          />
        )}
      </div>
    </div>
  );
};

export default FilePreview;