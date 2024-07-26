import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function UrbanIssues() {
  const [reporteData, setReporteData] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('reporteDataList')) || [];
    setReporteData(data);
  }, []);

  const handleSendToWorkshop = (index) => {
    const updatedData = [...reporteData];
    updatedData.splice(index, 1);
    setReporteData(updatedData);
    localStorage.setItem('reporteDataList', JSON.stringify(updatedData));

    Swal.fire({
      icon: 'success',
      title: 'Enviado al Taller',
      text: 'La unidad ha sido enviada al taller exitosamente.',
      confirmButtonText: 'OK'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Reporte de Fallas de Unidades</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Unidad</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Fallas</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reporteData.map((reporte, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">{reporte.origen}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">{reporte.reporteFallas}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                    <button
                      onClick={() => handleSendToWorkshop(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition duration-300"
                    >
                      Enviar a Taller
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={() => window.history.back()}
          className="mt-6 bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
        >
          Regresar
        </button>
      </div>
    </div>
  );
}

export default UrbanIssues;
