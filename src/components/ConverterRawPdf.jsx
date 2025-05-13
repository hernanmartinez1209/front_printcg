import { useState } from 'react';
import axios from 'axios';
import { UploadCloud, FileText, Loader2, CheckCircle } from 'lucide-react';

export const ConverterRawPdf = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState('');
  const [error, setError] = useState('');

  const allowedTypes = [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/vnd.ms-excel', // .xls
    'image/jpeg',
    'image/png',
  ];

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected || !allowedTypes.includes(selected.type)) {
      setError('Tipo de archivo no permitido.');
      setFile(null);
      return;
    }

    setFile(selected);
    setDownloadLink('');
    setError('');
  };

  const handleConvert = async () => {
    if (!file) return;
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('https://bakc-flask-converter-pdf.onrender.com/convert', formData, {
        responseType: 'blob',
      });

      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadLink(url);
    } catch (error) {
      const message = error.response?.data?.error || 'Error desconocido';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const fileType = file?.type.split('/')[1];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-sm text-gray-500 mb-4">Convertidor a PDF</h1>

      <label className="cursor-pointer flex flex-col items-center border-2 border-dashed border-gray-400 p-6 rounded-xl hover:border-indigo-500 transition">
        <UploadCloud size={40} className="text-indigo-400" />
        <p className="mt-2 text-sm text-gray-500">Selecciona un archivo Word, Excel o Imagen</p>
        <input
          type="file"
          accept=".docx,.xlsx,.xls,.png,.jpg,.jpeg"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {file && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <div className="text-sm text-gray-600 flex items-center">
            <FileText size={18} className="mr-2" /> {file.name}
          </div>
          <div className="text-xs text-gray-500">
            {(file.size / 1000).toFixed(1)} KB · {fileType?.toUpperCase()}
          </div>
        </div>
      )}

      <button
        onClick={handleConvert}
        disabled={loading}
        className={`w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? <Loader2 className="animate-spin inline mr-2" /> : 'Convertir a PDF'}
      </button>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {downloadLink && (
        <a
          href={downloadLink}
          download="archivo_convertido.pdf"
          className="mt-4 text-green-600 text-sm hover:underline inline-flex items-center"
        >
          <CheckCircle className="mr-2" /> Descargar PDF
        </a>
      )}
    </div>
  );
};
