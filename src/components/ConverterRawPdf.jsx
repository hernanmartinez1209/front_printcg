import { useState } from 'react';
import axios from 'axios';
import { UploadCloud, FileText, Loader2, CheckCircle } from 'lucide-react';
export const ConverterRawPdf = () => {  
    const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setDownloadLink('');
  };

  const handleConvert = async () => {
    if (!file) return;
    setLoading(true);
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
      alert('Error en la conversión: ' + message);
    } finally {
      setLoading(false);
    }
  };

  const fileType = file?.type.split('/')[1];
  return (
     <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg  flex justify-center flex-col items-center gap-5">
        <h1 className=" pb-4 mt-1 max-w-2xl text-sm text-gray-500">Convertidor a PDF</h1>

        <label className="cursor-pointer flex flex-col items-center border-2 border-dashed border-gray-600 p-6 rounded-xl hover:border-indigo-500 transition">
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
          <div className="mt-4 bg-gray-100 rounded-lg p-4 text-left">
            <div className="flex items-center text-sm text-gray-300">
              <FileText className="mr-2" size={18} />
              {file.name}
            </div>
            <div className="mt-2 text-xs text-gray-400">
              {(file.size / 1000).toFixed(1)} KB · {fileType?.toUpperCase()}
            </div>
          </div>
        )}

        <button
          onClick={handleConvert}
          className="w-full bg-indigo-600 hover:bg-indigo-700 mt-1 max-w-2xl text-sm text-white py-2 px-4`w-full flex justify-center px-4 border border-transparent rounded-md shadow-sm font-medium ${
             "
        >
          {loading ? <Loader2 className="animate-spin inline-block" /> : 'Convertir a PDF'}
        </button>

        {downloadLink && (
          <a
            href={downloadLink}
            download="archivo_convertido.pdf"
            className="mt-4 inline-flex items-center text-green-400 hover:underline text-sm"
          >
            <CheckCircle className="inline-block mr-2" /> Descargar PDF
          </a>
        )}
      </div>
    </div>
  );

}
