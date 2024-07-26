import React, { useState, useEffect } from 'react';

function CumplimientoHorario() {
  const [horarioData, setHorarioData] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('horarioDataList')) || [];
    setHorarioData(data);
  }, []);

  const markAsVerified = (index, status) => {
    const updatedData = [...horarioData];
    updatedData[index].verified = status;
    setHorarioData(updatedData);
    localStorage.setItem('horarioDataList', JSON.stringify(updatedData));
  };

  const deleteRecord = (index) => {
    const updatedData = horarioData.filter((_, i) => i !== index);
    setHorarioData(updatedData);
    localStorage.setItem('horarioDataList', JSON.stringify(updatedData));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Choferes y su Cumplimiento de Horario</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Unidad</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Hora de Entrada</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Hora de Salida</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Trabajó Hoy</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Verificación</th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {horarioData.map((horario, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">{horario.unidad}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">{horario.horaEntrada}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">{horario.horaSalida}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">{horario.trabajar ? 'Sí' : 'No'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                    {horario.verified === true && '✅'}
                    {horario.verified === false && '❌'}
                    {horario.verified === undefined && 'Pendiente'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200 flex space-x-2">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => markAsVerified(index, true)}
                    >
                      ✅
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => markAsVerified(index, false)}
                    >
                      ❌
                    </button>
                    <button
                      className="bg-gray-500 text-white px-2 py-1 rounded"
                      onClick={() => deleteRecord(index)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CumplimientoHorario;
