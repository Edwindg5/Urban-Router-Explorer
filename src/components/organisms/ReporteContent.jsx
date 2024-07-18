import React, { useState, useEffect } from 'react';
import ButtonOptions from '../atoms/ButtonOptions';

function ReporteContent() {
  const [horarioDataList, setHorarioDataList] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('horarioDataList')) || [];
    setHorarioDataList(data);
  }, []);

  const handleDelete = (index) => {
    const updatedList = horarioDataList.filter((_, i) => i !== index);
    setHorarioDataList(updatedList);
    localStorage.setItem('horarioDataList', JSON.stringify(updatedList));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Reporte de Horarios</h2>
          <ButtonOptions to="/options" className="bg-red-500 text-white p-2 rounded">Regresar</ButtonOptions>
        </div>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Fecha y Hora</th>
              <th className="px-4 py-2 border">Trabajar</th>
              <th className="px-4 py-2 border">Hora de Entrada</th>
              <th className="px-4 py-2 border">Hora de Salida</th>
              <th className="px-4 py-2 border">Unidad</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {horarioDataList.map((data, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{data.timestamp}</td>
                <td className="px-4 py-2 border">{data.trabajar ? 'Sí' : 'No'}</td>
                <td className="px-4 py-2 border">{data.horaEntrada}</td>
                <td className="px-4 py-2 border">{data.horaSalida}</td>
                <td className="px-4 py-2 border">{data.unidad}</td>
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
