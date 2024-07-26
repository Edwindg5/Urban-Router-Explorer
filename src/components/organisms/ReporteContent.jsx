import React, { useState, useEffect } from 'react';
import ButtonOptions from '../atoms/ButtonOptions';

function ReporteContent() {
  const [reporteDataList, setReporteDataList] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('reporteDataList')) || [];
    setReporteDataList(data);
  }, []);

  const handleDelete = (index) => {
    const updatedList = reporteDataList.filter((_, i) => i !== index);
    setReporteDataList(updatedList);
    localStorage.setItem('reporteDataList', JSON.stringify(updatedList));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Reporte de Conductor</h2>
          <ButtonOptions to="/options" className="bg-red-500 text-white p-2 rounded">Regresar</ButtonOptions>
        </div>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Fecha y Hora</th>
              <th className="px-4 py-2 border">Conductor</th>
              <th className="px-4 py-2 border">Reporte General</th>
              <th className="px-4 py-2 border">Fallas de la Unidad</th>
              <th className="px-4 py-2 border">Problemas en la Carretera</th>
              <th className="px-4 py-2 border">Origen</th>
              <th className="px-4 py-2 border">Destino</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reporteDataList.map((data, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{data.timestamp}</td>
                <td className="px-4 py-2 border">{data.nombre}</td>
                <td className="px-4 py-2 border">{data.reporteGeneral}</td>
                <td className="px-4 py-2 border">{data.reporteFallas}</td>
                <td className="px-4 py-2 border">{data.reporteProblemas}</td>
                <td className="px-4 py-2 border">{data.origen}</td>
                <td className="px-4 py-2 border">{data.destino}</td>
                <td className="px-4 py-2 border">
                  <button 
                    onClick={() => handleDelete(index)} 
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReporteContent;
